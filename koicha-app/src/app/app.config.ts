import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { AuthService } from './services/auth.service';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Import provideEchartsCore and provideEcharts here
import { provideEchartsCore } from 'ngx-echarts';

// Import the echarts core library
import * as echarts from 'echarts/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideEchartsCore({ echarts }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.checkAuth();
    }),
  ],
};
