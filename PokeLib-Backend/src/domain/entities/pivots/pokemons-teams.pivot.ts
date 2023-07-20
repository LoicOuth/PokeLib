import { Ability } from '../ability.entity';
import { Move } from '../move.entity';
import { Pokemon } from '../pokemon.entity';
import { Team } from '../team.entity';

export class pokemons_teams {
  pokemon_id: bigint;
  team_id: bigint;
  ability_id: bigint;
  move_1_id: bigint;
  move_2_id: bigint;
  move_3_id: bigint;
  move_4_id: bigint;

  pokemon?: Pokemon;
  team?: Team;
  ability?: Ability;
  move_1?: Move;
  move_2?: Move;
  move_3?: Move;
  move_4?: Move;
}
