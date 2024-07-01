import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import { LoggerService } from 'src/app/services/logger/logger.service';

/**
 * Interceptor to handle global HTTP errors.
 *
 * This interceptor retries a failed HTTP request up to 3 times with a delay between each retry.
 * The delay increases linearly with each retry attempt, starting at 1 second.
 */
export const globalHttpErrorHandlerInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {
  const logger = inject(LoggerService);

  return next(req).pipe(
    retry({
      count: 3,
      delay: (_, retryCount) => timer(retryCount * 1_000),
    }),
    catchError((err) => {
      logger.error('Retries from the http interceptor failed').print();
      return throwError(() => err);
    }),
  );
};
