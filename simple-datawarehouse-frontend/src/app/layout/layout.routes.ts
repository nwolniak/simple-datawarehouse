import {Routes} from "@angular/router";
import {HomeComponent} from "@app/home";
import {DatabaseWindowComponent} from "@app/database";

export const LAYOUT_ROUTES: Routes = [
  {path: "home", component: HomeComponent},
  {path: "database", component: DatabaseWindowComponent}
]
