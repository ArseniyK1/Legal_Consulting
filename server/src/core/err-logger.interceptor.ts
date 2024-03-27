import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import config from '../../config/configuration';
// import { map } from 'rxjs/operators';

/**
 * Перехватчик запросов выполненных с ошибкой.
 * Логирует сообщение об ошибке или стэк ошибки в зависимости от настроек логера
 */

@Injectable()
export class ErrLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger();
  private loggerConfig = config().LOGGER;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((e) => {
        this.loggerConfig?.log_err_stack
          ? this.logger.error(e.stack)
          : this.logger.error(e.message); // логировать стэк ошибок или только сообщение
        return throwError(() => e);
      }),
    );

    // return next.handle().pipe(
    //   map((data) => {
    //     this.logger.debug(`data`);
    //     return data;
    //   }),
    // );

    // const now = Date.now();
    // return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
