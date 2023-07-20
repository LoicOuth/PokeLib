import { PokeApiEntity } from './common/pokeapi.entity';
import { pokemons_teams } from './pivots/pokemons-teams.pivot';
import { Pokemon } from './pokemon.entity';

export class Ability extends PokeApiEntity {
  name: string;
  effect_entries: string;
  effect_change: string;

  pokemons?: Pokemon[];
  pokemons_teams?: pokemons_teams[];
}
