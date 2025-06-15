import {Routes} from '@angular/router';
import {DatabaseComponent} from '@app/database';
import {EtlComponent} from '@app/etl';
import {AnalyticsComponent} from "@app/analytics";
import {WelcomePageComponent} from "@app/layout/welcome-page/welcome-page.component";

export const LAYOUT_ROUTES: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'etl', component: EtlComponent},
  {path: 'database', component: DatabaseComponent},
  {path: 'analytics', component: AnalyticsComponent}
];
