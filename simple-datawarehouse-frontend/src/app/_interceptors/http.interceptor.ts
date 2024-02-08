import {HttpInterceptorFn} from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    withCredentials: true,
    setHeaders: {
      "Authorization": `Basic ${btoa("user:password")}`
    }
  })
  return next(req);
};
