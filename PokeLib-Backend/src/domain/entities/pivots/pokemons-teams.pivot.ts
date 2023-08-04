import { Ability } from '../ability.entity';
import { Pokemon } from '../pokemon.entity';
import { Team } from '../team.entity';

export class PokemonToTeam {
  ability_id: number;
  pokemon_id: number;
  team_id: number;

  pokemon?: Pokemon;
  team?: Team;
  ability?: Ability;
}
