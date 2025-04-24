import {Component} from '@angular/core';
import {DatasourceComponent} from '@app/layout/topbar/datasource/datasource.component';
import {ToolbarModule} from "primeng/toolbar";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [DatasourceComponent, ToolbarModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
}
