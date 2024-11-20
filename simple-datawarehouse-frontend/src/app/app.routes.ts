import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/layout';

const layoutRoutesLazy = () =>
  import('@app/layout/layout.routes').then((routes) => routes.LAYOUT_ROUTES);

export const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: layoutRoutesLazy },
  { path: '**', redirectTo: '' },
];
