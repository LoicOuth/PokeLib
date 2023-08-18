import { UserDto } from 'src/application/user/dtos/user.dto';
import { PokemonsTeamDto } from './pokemons-team.dto';
import { Team } from 'src/domain/entities/team.entity';

export class TeamDto {
  id: number;
  name: string;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: number;

  user?: UserDto;
  pokemons_teams?: PokemonsTeamDto[];

  constructor(
    id: number,
    name: string,
    is_public: boolean,
    created_at: Date,
    updated_at: Date,
    user_id: number,
    user?: UserDto,
    pokemons_teams?: PokemonsTeamDto[],
  ) {
    this.id = id;
    this.name = name;
    this.is_public = is_public;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id;
    this.user = user;
    this.pokemons_teams = pokemons_teams;
  }

  static projection = (team: Team) =>
    new this(
      team.id,
      team.name,
      team.is_public,
      team.created_at,
      team.updated_at,
      team.user_id,
      team.user ? UserDto.projection(team.user) : undefined,
      team.pokemons_teams ? PokemonsTeamDto.listProjection(team.pokemons_teams) : undefined,
    );

  static listProjection = (teams: Team[]) => teams.map((el) => this.projection(el));
}
