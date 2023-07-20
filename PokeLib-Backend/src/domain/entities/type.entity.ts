import { PokeApiEntity } from './common/pokeapi.entity';
import { Move } from './move.entity';
import { pokemons_past_types } from './pivots/pokemons-past-types.pivot';
import { Pokemon } from './pokemon.entity';

export class Type extends PokeApiEntity {
  name: string;
  color: string;

  moves?: Move[];
  pokemons_past_types?: pokemons_past_types[];
  first_type_pokemons?: Pokemon[];
  second_type_pokemons?: Pokemon[];
}
