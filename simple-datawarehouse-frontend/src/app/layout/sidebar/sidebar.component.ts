import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, MenubarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit{

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      { label: 'ETL', routerLink: '/etl'},
      { label: 'Database', routerLink: '/database' },
      { label: 'Analytics', routerLink: '/analytics' },
    ]
  }

}
