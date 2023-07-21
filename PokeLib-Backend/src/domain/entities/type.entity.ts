import { PokeapiNamedEntity } from './common/pokeapi-named.entity';
import { Move } from './move.entity';
import { pokemons_past_types } from './pivots/pokemons-past-types.pivot';
import { Pokemon } from './pokemon.entity';

export class Type extends PokeapiNamedEntity {
  color: string;

  moves?: Move[];
  pokemons_past_types?: pokemons_past_types[];
  first_type_pokemons?: Pokemon[];
  second_type_pokemons?: Pokemon[];
}
