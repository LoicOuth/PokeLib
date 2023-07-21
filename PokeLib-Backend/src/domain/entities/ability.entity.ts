import { PokeapiNamedEntity } from './common/pokeapi-named.entity';
import { pokemons_teams } from './pivots/pokemons-teams.pivot';
import { Pokemon } from './pokemon.entity';

export class Ability extends PokeapiNamedEntity {
  effect_entries: string;

  pokemons?: Pokemon[];
  pokemons_teams?: pokemons_teams[];
}
