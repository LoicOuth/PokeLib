import { AuthController } from './controllers/auth.controller';
import { DataController } from './controllers/data.controller';
import { PokemonController } from './controllers/pokemon.controller';
import { TeamController } from './controllers/team.controller';
import { TypeController } from './controllers/type.controller';
import { UserController } from './controllers/user.controller';
import { TeamGateway } from './gateways/team.gateway';

export const controllers = [
  UserController,
  AuthController,
  DataController,
  PokemonController,
  TypeController,
  TeamController,
];

export const gateways = [TeamGateway];
