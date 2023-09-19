import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './infrastructure/adapter/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { handlers, helpers } from './application';
import { controllers, gateways } from './presentation';
import { externals, repositories } from './infrastructure';
import { IEnvironmentConfig } from './application/common/interfaces/environment.interface';

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
  controllers: [...controllers],
  providers: [...handlers, ...gateways, ...repositories, ...externals, ...helpers, PrismaService],
})
export class AppModule {}
