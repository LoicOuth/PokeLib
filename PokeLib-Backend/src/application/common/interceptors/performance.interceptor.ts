import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PerformanceInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const date = Date.now();

    return next.handle().pipe(
      tap(() => {
        const elapsedTime = Date.now() - date;
        if (elapsedTime > 5000)
          this.logger.warn(
            `Long Running Request: ${request.method} ${request.originalUrl} (${elapsedTime} milliseconds)`,
          );
      }),
    );
  }
}
