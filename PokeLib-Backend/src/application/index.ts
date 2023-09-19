import { LoginWithGoogleCommandHandler } from './auth/commands/login-with-google.command';
import { LoginCommandHandler } from './auth/commands/login.command';
import { JwtHelper } from './auth/helpers/jwt.helper';
import { CurrentUserService } from './common/services/current-user.service';
import { RefreshDataFromPokeapiCommandHandler } from './pokeapi/commands/refresh-data-from-pokeapi.command';
import { PokemonHelper } from './pokemon/helpers/pokemon.helper';
import { GetAllPokemonQueryHandler } from './pokemon/queries/get-all-pokemon.query';
import { AddPokemonToTeamCommandHandler } from './teams/commands/add-pokemon-to-team.command';
import { CreateTeamCommandHandler } from './teams/commands/create-team.command';
import { DeletePokemonToTeamCommandHandler } from './teams/commands/delete-pokemon-to-team.command';
import { DeleteTeamCommandHandler } from './teams/commands/delete-team.commad';
import { SetPublicTeamCommandHandler } from './teams/commands/set-public-team.commad';
import { SwitchPokemonToTeamCommandHandler } from './teams/commands/switch-pokemon-to-team.command';
import { UpdateNameTeamCommandHandler } from './teams/commands/update-name-team.command';
import { TeamHelper } from './teams/helpers/team.helper';
import { GetTeamsFromUserQueryHadnler } from './teams/queries/get-from-user.query copy';
import { GetMyTeamsQueryHandler } from './teams/queries/get-my-teams.query';
import { GetOneTeamQueryHandler } from './teams/queries/get-one-team.query';
import { GetPublicTeamsQueryHandler } from './teams/queries/get-public-teams.query';
import { GetAllTypeQueryHandler } from './type/queries/get-all-type.query';
import { CreateUserCommandHandler } from './user/commands/create-user.command';
import { UpdateUserAvatarCommandHandler } from './user/commands/update-user-avatar.command';
import { UpdateUserPasswordCommandHandler } from './user/commands/update-user-password.command';
import { UpdateUserCommandHandler } from './user/commands/update-user.command';
import { UserHelper } from './user/helpers/user.helper';
import { GetAllUserQueryHandler } from './user/queries/get-all-user.query';
import { GetMeQueryHandler } from './user/queries/get-me.query';
import { GetUserByPseudoQueryHandler } from './user/queries/get-user-by-pseudo.query';

const teamHandlers = [
  GetOneTeamQueryHandler,
  GetPublicTeamsQueryHandler,
  GetMyTeamsQueryHandler,
  CreateTeamCommandHandler,
  UpdateNameTeamCommandHandler,
  AddPokemonToTeamCommandHandler,
  DeletePokemonToTeamCommandHandler,
  SwitchPokemonToTeamCommandHandler,
  DeleteTeamCommandHandler,
  SetPublicTeamCommandHandler,
  GetTeamsFromUserQueryHadnler,
];

const typeHandlers = [GetAllTypeQueryHandler];

const pokemonHandlers = [GetAllPokemonQueryHandler];

const dataHandlers = [RefreshDataFromPokeapiCommandHandler];

const userHandlers = [
  GetAllUserQueryHandler,
  GetMeQueryHandler,
  CreateUserCommandHandler,
  UpdateUserAvatarCommandHandler,
  UpdateUserCommandHandler,
  GetUserByPseudoQueryHandler,
  UpdateUserPasswordCommandHandler,
];

const authHandlers = [LoginCommandHandler, LoginWithGoogleCommandHandler];

export const handlers = [
  ...teamHandlers,
  ...pokemonHandlers,
  ...typeHandlers,
  ...userHandlers,
  ...authHandlers,
  ...dataHandlers,
];

export const helpers = [JwtHelper, UserHelper, TeamHelper, PokemonHelper, CurrentUserService];
