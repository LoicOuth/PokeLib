import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { UserRepository } from './repositories/user.repository';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { AbilityRepository } from './repositories/ability.repository';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { TypeRepository } from './repositories/type.repository';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';
import { PokemonRepository } from './repositories/pokemon.repository';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { TeamRepository } from './repositories/teams.repository';
import { Provider } from '@nestjs/common';
import { IGoogleAuth } from 'src/application/common/ports/google-auth.port';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { PokeapiData } from './pokeapi/pokeapi-data.service';
import { IPokeapiData } from 'src/application/common/ports/pokeapi-data.port';

export const repositories: Provider[] = [
  { provide: IUserRepository, useClass: UserRepository },
  { provide: IAbilityRepository, useClass: AbilityRepository },
  { provide: ITypeRepository, useClass: TypeRepository },
  { provide: IPokemonRepository, useClass: PokemonRepository },
  { provide: ITeamsRepository, useClass: TeamRepository },
];

export const externals: Provider[] = [
  { provide: IGoogleAuth, useClass: GoogleAuthService },
  { provide: IPokeapiData, useClass: PokeapiData },
];
