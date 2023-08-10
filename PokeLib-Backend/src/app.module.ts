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
import { IPokeapiData } from './application/common/ports/pokeapi-data.port';
import { PokeapiData } from './infrastructure/pokeapi/pokeapi-data.service';
import { RefreshDataFromPokeapiCommandHandler } from './application/pokeapi/commands/refresh-data-from-pokeapi.command';
import { DataController } from './presentation/controllers/data.controller';
import { AbilityRepository } from './infrastructure/repositories/ability.repository';
import { IAbilityRepository } from './application/common/ports/ability-repository.port';
import { ITypeRepository } from './application/common/ports/type-repository.port';
import { TypeRepository } from './infrastructure/repositories/type.repository';
import { IPokemonRepository } from './application/common/ports/pokemon-repository.port';
import { PokemonRepository } from './infrastructure/repositories/pokemon.repository';
import { GetAllPokemonQueryHandler } from './application/pokemon/queries/get-all-pokemon.query';
import { PokemonController } from './presentation/controllers/pokemon.controller';
import { TypeController } from './presentation/controllers/type.controller';
import { GetAllTypeQueryHandler } from './application/type/queries/get-all-type.query';
import { UserHelper } from './application/user/helpers/user.helper';

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
  //pokmeon
  GetAllPokemonQueryHandler,
  //Type
  GetAllTypeQueryHandler,
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
  controllers: [UserController, AuthController, DataController, PokemonController, TypeController],
  providers: [
    ...handlers,
    //Service
    PrismaService,
    //helper
    JwtHelper,
    UserHelper,
    CurrentUserService,
    //Repository
    { provide: IUserRepository, useClass: UserRepository },
    { provide: IAbilityRepository, useClass: AbilityRepository },
    { provide: ITypeRepository, useClass: TypeRepository },
    { provide: IPokemonRepository, useClass: PokemonRepository },
    // Other
    { provide: IGoogleAuth, useClass: GoogleAuthService },
    { provide: IPokeapiData, useClass: PokeapiData },
  ],
})
export class AppModule {}
