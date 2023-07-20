import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class UnhandledExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(UnhandledExceptionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError((err) => {
        const error = err instanceof Error ? err : err.error;
        this.logger.error(`${request.method} ${request.originalUrl} ${error.message}`, error.stack);

        return throwError(() => error);
      }),
    );
  }
}
