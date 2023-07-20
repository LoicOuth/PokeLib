import { Generation } from '../generation.entity';
import { Pokemon } from '../pokemon.entity';
import { Type } from '../type.entity';

export class pokemons_past_types {
  pokemon_id: bigint;
  type_id: bigint;
  generation_id: bigint;

  pokemon?: Pokemon;
  type?: Type;
  generation?: Generation;
}
