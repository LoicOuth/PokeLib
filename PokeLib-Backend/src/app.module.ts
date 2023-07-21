import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserController } from './presentation/controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtHelper } from './application/auth/helpers/jwt.helper';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './infrastructure/adapter/prisma.service';
import { IUserRepository } from './application/common/ports/user-repository.port';
import { IGoogleAuth } from './application/common/ports/google-auth.port';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { GoogleAuthService } from './infrastructure/google-auth/google-auth.service';
import { IEnvironmentConfig } from './application/common/interfaces/environment.interface';
import { LoginWithGoogleCommandHandler } from './application/auth/commands/login-with-google.command';
import { GetAllUserQueryHandler } from './application/user/queries/get-all-user.query';
import { CurrentUserService } from './application/common/services/current-user.service';
import { GetMeQueryHandler } from './application/user/queries/get-me.query';
import { CreateUserCommandHandler } from './application/user/commands/create-user.command';
import { UpdateUserAvatarCommandHandler } from './application/user/commands/update-user-avatar.command';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoginCommandHandler } from './application/auth/commands/login.command';
import { PokeapiClient } from './infrastructure/pokeapi/pokeapi-client.service';
import { IPokeapiData } from './application/common/ports/pokeapi-data.port';
import { PokeapiData } from './infrastructure/pokeapi/pokeapi-data.service';
import { RefreshDataFromPokeapiCommandHandler } from './application/pokeapi/commands/refresh-data-from-pokeapi.command';
import { DataController } from './presentation/controllers/data.controller';
import { AbilityRepository } from './infrastructure/repositories/ability.repository';
import { IAbilityRepository } from './application/common/ports/ability-repository.port';
import { IEvolutionTriggerRepository } from './application/common/ports/evolution-trigger.port';
import { EvolutionTriggerRepository } from './infrastructure/repositories/evolution-trigger.repository';
import { IEvolutionChainRepository } from './application/common/ports/evolution-chain-repository.port';
import { EvolutionChainRepository } from './infrastructure/repositories/evolution-chain.repository';
import { ITypeRepository } from './application/common/ports/type-repository.port';
import { TypeRepository } from './infrastructure/repositories/type.repository';
import { IMoveRepository } from './application/common/ports/move-repository.port';
import { MoveRepository } from './infrastructure/repositories/move.repository';
import { IStatRepository } from './application/common/ports/stat-repository.port';
import { StatRepository } from './infrastructure/repositories/stat.repository';
import { IRegionRepository } from './application/common/ports/region-repository.port';
import { RegionRepository } from './infrastructure/repositories/region.repository';
import { ILocationRepository } from './application/common/ports/location-repository.port';
import { LocationRepository } from './infrastructure/repositories/location.repository';
import { ILocationAreaRepository } from './application/common/ports/location-area-repository.port';
import { LocationAreaRepository } from './infrastructure/repositories/location-area.repository';
import { IGenerationRepository } from './application/common/ports/generation-repository.port';
import { GenerationRepository } from './infrastructure/repositories/generation.repository';
import { IVersionGroupRepository } from './application/common/ports/version-group-repository.port';
import { VersionGroupRepository } from './infrastructure/repositories/version-group.repository';
import { IVersionRepository } from './application/common/ports/version-repository.port';
import { VersionRepository } from './infrastructure/repositories/version.repository';
import { IPokemonRepository } from './application/common/ports/pokemon-repository.port';
import { PokemonRepository } from './infrastructure/repositories/pokemon.repository';

const handlers = [
  LoginCommandHandler,
  LoginWithGoogleCommandHandler,
  //User handlers
  GetAllUserQueryHandler,
  GetMeQueryHandler,
  CreateUserCommandHandler,
  UpdateUserAvatarCommandHandler,
  //data
  RefreshDataFromPokeapiCommandHandler,
];

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService<IEnvironmentConfig>) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/images'),
      serveRoot: '/uploads/images',
    }),
  ],
  controllers: [UserController, AuthController, DataController],
  providers: [
    ...handlers,
    //Service
    PrismaService,
    //helper
    JwtHelper,
    CurrentUserService,
    //Repository
    { provide: IUserRepository, useClass: UserRepository },
    { provide: IAbilityRepository, useClass: AbilityRepository },
    { provide: IEvolutionTriggerRepository, useClass: EvolutionTriggerRepository },
    { provide: IEvolutionChainRepository, useClass: EvolutionChainRepository },
    { provide: ITypeRepository, useClass: TypeRepository },
    { provide: IMoveRepository, useClass: MoveRepository },
    { provide: IStatRepository, useClass: StatRepository },
    { provide: IRegionRepository, useClass: RegionRepository },
    { provide: ILocationRepository, useClass: LocationRepository },
    { provide: ILocationAreaRepository, useClass: LocationAreaRepository },
    { provide: IGenerationRepository, useClass: GenerationRepository },
    { provide: IVersionGroupRepository, useClass: VersionGroupRepository },
    { provide: IVersionRepository, useClass: VersionRepository },
    { provide: IPokemonRepository, useClass: PokemonRepository },
    // Other
    { provide: IGoogleAuth, useClass: GoogleAuthService },
    { provide: IPokeapiData, useClass: PokeapiData },
    PokeapiClient,
  ],
})
export class AppModule {}
