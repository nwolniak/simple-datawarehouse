import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {AlertService} from "@app/_services";
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService: AlertService = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.error('Network error or CORS issue ...', error);
        error.error.timestamp = new Date().toString()
        error.error.message = 'Network error or CORS issue ... - ' + error.message;
        alertService.addAlert(error);
      } else {
        const message = typeof error.error === 'string'
          ? error.error
          : error.error?.message || 'Unexpected error occurred';
        console.error(`HTTP ${error.status}: `, message);
        alertService.addAlert(error);
      }
      return throwError(() => error);
    })
  );
};
