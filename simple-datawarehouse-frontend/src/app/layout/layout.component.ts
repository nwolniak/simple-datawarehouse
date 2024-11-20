import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsComponent } from '@app/analytics';
import {SidebarComponent} from "@app/layout/sidebar/sidebar.component";
import {TopbarComponent} from "@app/layout/topbar/topbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    TopbarComponent,
    AnalyticsComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
