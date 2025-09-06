import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Import provideEchartsCore and provideEcharts here
import { provideEchartsCore } from 'ngx-echarts';

// Import the echarts core library
import * as echarts from 'echarts/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEchartsCore({ echarts }),
  ],
};
