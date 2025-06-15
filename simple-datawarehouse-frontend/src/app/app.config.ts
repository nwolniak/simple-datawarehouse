import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {MessageService} from "primeng/api";
import {errorInterceptor, httpInterceptor} from "@app/_interceptors";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor, errorInterceptor])),
    provideNoopAnimations(),
    MessageService
  ],
};
