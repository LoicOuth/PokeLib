import { Ability } from '../ability.entity';
import { Pokemon } from '../pokemon.entity';
import { Team } from '../team.entity';

export class PokemonToTeam {
  ability_id: bigint;
  pokemon_id: bigint;
  team_id: bigint;

  pokemon?: Pokemon;
  team?: Team;
  ability?: Ability;
}