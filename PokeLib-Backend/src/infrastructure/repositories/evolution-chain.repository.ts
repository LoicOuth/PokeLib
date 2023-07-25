import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IEvolutionChainRepository } from 'src/application/common/ports/evolution-chain-repository.port';
import { IEvolutionChainDetail, IEvolutionTo } from 'src/application/common/interfaces/pokeapi/pokemon.interface';
import { IEvolutionTriggerRepository } from 'src/application/common/ports/evolution-trigger.port';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';
import { EvolutionChain } from 'src/domain/entities/evolution-chain.entity';

@Injectable()
export class EvolutionChainRepository implements IEvolutionChainRepository {
  constructor(
    private readonly prismaClient: PrismaService,
    private readonly evolutionTriggerRepo: IEvolutionTriggerRepository,
    private readonly pokemonRepo: IPokemonRepository,
  ) {}

  createFromPokeapi = async (evolutionChain: IEvolutionChainDetail): Promise<void> => {
    const count = await this.prismaClient.evolutionChain.count({
      where: { poke_api_id: evolutionChain.id },
    });
    if (count <= 0) {
      const evo = await this.prismaClient.evolutionChain.create({
        data: {
          poke_api_id: evolutionChain.id,
        },
      });

      await this.create(evolutionChain.chain, evo.id);
    }
  };

  getFromPokeapiId = async (pokeapiId: bigint): Promise<EvolutionChain> =>
    await this.prismaClient.evolutionChain.findUniqueOrThrow({ where: { poke_api_id: pokeapiId } });

  private create = (evolve: IEvolutionTo, chainId: bigint) => {
    evolve.evolves_to.forEach(async (el) => {
      if (evolve.evolution_details.length > 0) {
        const evolutionTrigger = await this.evolutionTriggerRepo.getFromName(evolve.evolution_details[0].trigger.name);

        const fromPokemon = await this.pokemonRepo.updateEvolutionChainAndGet(evolve.species.name, chainId);
        const toPokemon = await this.pokemonRepo.updateEvolutionChainAndGet(el.species.name, chainId);

        const data = {
          evolution_chain_id: chainId,
          evolution_trigger_id: evolutionTrigger.id,
          pokemon_from_id: fromPokemon.id,
          pokemon_to_id: toPokemon.id,
        };

        await this.prismaClient.evolutions_chain_pokemons.upsert({
          where: {
            evolution_trigger_id_evolution_chain_id_pokemon_from_id_pokemon_to_id: data,
          },
          update: data,
          create: data,
        });
      }

      await this.create(el, chainId);
    });
  };
}
