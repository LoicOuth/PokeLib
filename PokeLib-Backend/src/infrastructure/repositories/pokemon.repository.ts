import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IPokeapiPokemon } from 'src/application/common/interfaces/pokeapi/pokemon.interface';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';
import { Pokemon } from 'src/domain/entities/pokemon.entity';
import { EvolutionType } from '@prisma/client';

@Injectable()
export class PokemonRepository implements IPokemonRepository {
  constructor(
    private readonly prismaClient: PrismaService,
    private readonly abilityRepo: IAbilityRepository,
    private readonly typeRepo: ITypeRepository,
  ) {}

  getOne = async (pokemonId: number): Promise<Pokemon> =>
    await this.prismaClient.pokemon.findFirst({ where: { id: pokemonId } });

  getAll = async (): Promise<Pokemon[]> =>
    await this.prismaClient.pokemon.findMany({ include: { evolutions: { include: { pokemon_evolution: true } } } });

  //Need refactor
  createOrUpdateFromPokeapi = async (pokemons: IPokeapiPokemon[]): Promise<void> => {
    for (const pokemon of pokemons) {
      if (pokemon.pokedexId === 0) continue;

      const type1 = await this.typeRepo.getFromName(pokemon.types[0].name);
      let type2 = null;
      if (pokemon.types.length > 1) type2 = await this.typeRepo.getFromName(pokemon.types[1].name);

      const data = {
        name: pokemon.name.fr,
        description: pokemon.category,
        height: pokemon.height,
        weight: pokemon.weight,
        generation: pokemon.generation,
        sprite_regular: pokemon.sprites.regular,
        sprite_shiny: pokemon.sprites.shiny,
        sprite_gmax: pokemon.sprites.gmax?.regular,
        hp: pokemon.stats.hp,
        atk: pokemon.stats.atk,
        def: pokemon.stats.def,
        spe_atk: pokemon.stats.spe_atk,
        spe_def: pokemon.stats.spe_def,
        vit: pokemon.stats.vit,
        first_type_id: type1.id,
        second_type_id: type2?.id,
      };

      const pokemonEntity = await this.prismaClient.pokemon.upsert({
        where: {
          pokedex_order: pokemon.pokedexId,
        },
        update: data,
        create: {
          ...data,
          pokedex_order: pokemon.pokedexId,
        },
      });

      if (pokemon.talents)
        for (const ability of pokemon.talents) {
          const abilityEntity = await this.abilityRepo.createOrUpdateFromPokeapi(ability.name);
          const search = {
            pokemon_id: pokemonEntity.id,
            ability_id: abilityEntity.id,
          };

          const data = {
            ...search,
            is_hidden: ability.tc,
          };

          await this.prismaClient.abilityToPokemon.upsert({
            where: {
              pokemon_id_ability_id: search,
            },
            update: data,
            create: data,
          });
        }
    }
  };

  //Need refactor
  createOrUpdateEvolutionFromPokeapi = async (pokemons: IPokeapiPokemon[]): Promise<void> => {
    for (const pokemon of pokemons) {
      if (pokemon.pokedexId === 0) continue;

      const pokemonEntity = await this.prismaClient.pokemon.findUniqueOrThrow({
        where: { pokedex_order: pokemon.pokedexId },
      });

      if (pokemon.evolution) {
        if (pokemon.evolution.mega && pokemon.evolution.mega.length > 0) {
          for (const megaEvolution of pokemon.evolution.mega) {
            const megaEvolutionData = {
              orbe: megaEvolution.orbe || megaEvolution.obre,
              sprite_regular: megaEvolution.sprites.regular,
              sprite_shiny: megaEvolution.sprites.shiny,
              pokemon_id: pokemonEntity.id,
            };

            const megaEvolutionEntity = await this.prismaClient.megaEvolution.findFirst({
              where: {
                AND: [{ pokemon_id: pokemonEntity.id }, { orbe: megaEvolution.orbe }],
              },
            });

            await this.prismaClient.megaEvolution.upsert({
              where: {
                id: megaEvolutionEntity ? megaEvolutionEntity.id : 0,
              },
              update: megaEvolutionData,
              create: megaEvolutionData,
            });
          }
        }

        const evolutions = [];

        if (pokemon.evolution.next && pokemon.evolution.next.length > 0) {
          evolutions.push(...pokemon.evolution.next.map((el) => ({ ...el, type: EvolutionType.NEXT })));
        }

        if (pokemon.evolution.pre && pokemon.evolution.pre.length > 0) {
          evolutions.push(...pokemon.evolution.pre.map((el) => ({ ...el, type: EvolutionType.PRE })));
        }

        if (evolutions.length > 0) {
          for (const evolution of evolutions) {
            const evolutionData = {
              condition: evolution.condition,
              pokemon_id: pokemonEntity.id,
              pokemon_evolution_id: evolution.pokedexId,
              type: evolution.type,
            };

            const evolutionEntity = await this.prismaClient.evolution.findFirst({
              where: {
                AND: [
                  { pokemon_id: evolutionData.pokemon_id },
                  { pokemon_evolution_id: evolutionData.pokemon_evolution_id },
                ],
              },
            });

            await this.prismaClient.evolution.upsert({
              where: {
                id: evolutionEntity ? evolutionEntity.id : 0,
              },
              update: evolutionData,
              create: evolutionData,
            });
          }
        }
      }
    }
  };
}
