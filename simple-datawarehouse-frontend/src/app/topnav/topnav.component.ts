import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DatasourceWindowComponent} from "@app/datasource";

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    DatasourceWindowComponent,
    DatasourceWindowComponent
  ],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {

}
