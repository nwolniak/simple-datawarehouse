import { Component } from '@angular/core';
import { DatasourceComponent } from '@app/layout/topbar/datasource/datasource.component';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [DatasourceComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {}
