import { Routes } from '@angular/router';
import { DatabaseComponent } from '@app/database';
import { EtlComponent } from '@app/etl';
import { AnalyticsComponent } from '@app/analytics';

export const LAYOUT_ROUTES: Routes = [
  { path: 'database', component: DatabaseComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'etl', component: EtlComponent },
];
