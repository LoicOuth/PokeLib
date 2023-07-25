import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';
import { IPokeapiPokemon } from 'src/application/common/interfaces/pokeapi/pokemon.interface';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';
import { Pokemon } from 'src/domain/entities/pokemon.entity';

@Injectable()
export class PokemonRepository implements IPokemonRepository {
  constructor(private readonly prismaClient: PrismaService, private readonly typeRepo: ITypeRepository) {}

  createOrUpdateFromPokeapi = async (pokemon: IPokeapiPokemon): Promise<void> => {
    const type1 = await this.typeRepo.getFromName(pokemon.types.find((el) => el.slot === 1).type.name);
    let type2 = null;
    if (pokemon.types.length > 1)
      type2 = await this.typeRepo.getFromName(pokemon.types.find((el) => el.slot === 2).type.name);

    const description = pokemon.flavor_text_entries.find((el) => el.language.name == 'en');

    const data = {
      name: pokemon.name,
      display_name: getNameInEnglish(pokemon),
      description: description ? description.flavor_text : '',
      is_default: pokemon.is_default,
      base_experience: pokemon.base_experience,
      height: pokemon.height,
      weight: pokemon.weight,
      pokedex_order: pokemon.pokedex_numbers.find((el) => el.pokedex.name == 'national').entry_number,
      is_legendary: pokemon.is_legendary,
      is_mythical: pokemon.is_mythical,
      has_gender_difference: pokemon.has_gender_differences,
      atwork: pokemon.sprites.other['official-artwork'].front_default,
      atwork_shiny: pokemon.sprites.other['official-artwork'].front_shiny,
      sprite_back_default: pokemon.sprites.back_default,
      sprite_back_default_shiny: pokemon.sprites.back_shiny,
      sprite_back_female: pokemon.sprites.back_female,
      sprite_back_female_shiny: pokemon.sprites.back_shiny_female,
      sprite_front_default: pokemon.sprites.front_default,
      sprite_front_default_shiny: pokemon.sprites.front_shiny,
      sprite_front_female: pokemon.sprites.front_female,
      sprite_front_female_shiny: pokemon.sprites.front_shiny_female,
      first_type_id: type1.id,
      second_type_id: type2 ? type2.id : type2,
      moves: {
        connect: pokemon.moves.map((el) => ({ name: el.move.name })),
      },
      abilities: {
        connect: pokemon.abilities.map((el) => ({ name: el.ability.name })),
      },
      versions: {
        connect: pokemon.game_indices.map((el) => ({ name: el.version.name })),
      },
      locations_areas: {
        connect: pokemon.location_areas.map((el) => ({ name: el.location_area.name })),
      },
    };

    await this.prismaClient.pokemon.upsert({
      where: {
        poke_api_id: pokemon.id,
      },
      update: data,
      create: {
        poke_api_id: pokemon.id,
        ...data,
        pokemons_stats: {
          create: pokemon.stats.map((el) => ({
            base_stat: el.base_stat,
            stat: {
              connect: {
                name: el.stat.name,
              },
            },
          })),
        },
      },
    });
  };

  getFromName = async (name: string): Promise<Pokemon> =>
    await this.prismaClient.pokemon.findUniqueOrThrow({ where: { name } });

  updateEvolutionChainAndGet = (name: string, chainId: any): Promise<Pokemon> =>
    this.prismaClient.pokemon.update({
      where: {
        name,
      },
      data: {
        evolution_chain_id: chainId,
      },
    });
}
