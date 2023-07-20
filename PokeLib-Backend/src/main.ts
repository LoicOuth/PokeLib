import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './application/common/interceptors/logger.inteceptor';
import { CurrentUserService } from './application/common/services/current-user.service';
import { PerformanceInterceptor } from './application/common/interceptors/performance.interceptor';
import { UnhandledExceptionInterceptor } from './application/common/interceptors/unhandled-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalInterceptors(
    new LoggerInterceptor(app.get(CurrentUserService)),
    new PerformanceInterceptor(),
    new UnhandledExceptionInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
