import {Routes} from "@angular/router";
import {HomeComponent} from "@app/home";
import {DatabaseLayoutComponent} from "../database-layout";

export const LAYOUT_ROUTES: Routes = [
  {path: "home", component: HomeComponent},
  {path: "database", component: DatabaseLayoutComponent}
]
