import { BaseEntity } from './common/base.entity';
import { PokemonToTeam } from './pivots/pokemons-teams.pivot';
import { User } from './user.entity';

export class Team extends BaseEntity {
  name: string;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: number;

  user?: User;
  pokemons_teams?: PokemonToTeam[];
}
