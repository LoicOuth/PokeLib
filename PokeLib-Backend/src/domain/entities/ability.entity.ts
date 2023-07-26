import { BaseEntity } from './common/base.entity';
import { AbilityToPokemon } from './pivots/abilities-pokemons.pivot';
import { PokemonToTeam } from './pivots/pokemons-teams.pivot';

export class Ability extends BaseEntity {
  name: string;

  pokemons_teams?: PokemonToTeam[];
  pokemons?: AbilityToPokemon[];
}
