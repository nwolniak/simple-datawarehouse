import {Routes} from "@angular/router";
import {HomeComponent} from "@app/home";
import {DatabaseLayoutComponent} from "../database-layout";
import {DiagramComponent} from "@app/diagram";
import {EtlComponent} from "@app/etl";
import {AnalyticsComponent} from "@app/analytics";

export const LAYOUT_ROUTES: Routes = [
  {path: "home", component: HomeComponent},
  {path: "database", component: DatabaseLayoutComponent},
  {path: "diagram", component: DiagramComponent},
  {path: "analytics", component: AnalyticsComponent},
  {path: "etl", component: EtlComponent}
]
