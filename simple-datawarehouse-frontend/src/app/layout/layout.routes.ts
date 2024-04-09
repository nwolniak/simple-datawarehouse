import {Routes} from "@angular/router";
import {HomeComponent} from "@app/home";
import {DatabaseLayoutComponent} from "../database-layout";
import {DiagramComponent} from "@app/diagram";

export const LAYOUT_ROUTES: Routes = [
  {path: "home", component: HomeComponent},
  {path: "database", component: DatabaseLayoutComponent},
  {path: "diagram", component: DiagramComponent}
]
