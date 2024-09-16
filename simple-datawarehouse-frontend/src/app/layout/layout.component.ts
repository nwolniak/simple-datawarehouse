import {Component} from '@angular/core';
import {SidebarComponent} from "@app/sidebar";
import {RouterOutlet} from "@angular/router";
import {TopnavComponent} from "@app/topnav";
import {AnalyticsComponent} from "@app/analytics";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    TopnavComponent,
    AnalyticsComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
