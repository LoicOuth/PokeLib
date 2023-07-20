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
import { UserRepository } from './infrastructure/repositories/user-repository.service';
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

const handlers = [
  LoginCommandHandler,
  LoginWithGoogleCommandHandler,
  //User handlers
  GetAllUserQueryHandler,
  GetMeQueryHandler,
  CreateUserCommandHandler,
  UpdateUserAvatarCommandHandler,
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
  controllers: [UserController, AuthController],
  providers: [
    ...handlers,
    //Service
    PrismaService,
    //helper
    JwtHelper,
    CurrentUserService,
    //Repository
    { provide: IUserRepository, useClass: UserRepository },
    // Other
    { provide: IGoogleAuth, useClass: GoogleAuthService },
  ],
})
export class AppModule {}
