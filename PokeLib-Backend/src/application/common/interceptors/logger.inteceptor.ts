import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  constructor(private readonly currentUserService: CurrentUserService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    this.logger.log(
      `New request ${request.method} ${request.originalUrl} ${request.rawHeaders} made by ${
        this.currentUserService.user ? this.currentUserService.user.id : ''
      } ${clientIp}`,
    );

    return next.handle();
  }
}
