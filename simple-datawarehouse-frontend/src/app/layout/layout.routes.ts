import {Routes} from '@angular/router';
import {DatabaseComponent} from '@app/database';
import {EtlComponent} from '@app/etl';
import {AnalyticsComponent} from '@app/analytics';
import {Analytics2Component} from "@app/analytics2";

export const LAYOUT_ROUTES: Routes = [
  {path: 'etl', component: EtlComponent},
  {path: 'database', component: DatabaseComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: 'analytics2', component: Analytics2Component}
];
