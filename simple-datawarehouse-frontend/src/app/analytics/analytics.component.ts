import { Component } from '@angular/core';
import { CreatorComponent } from '@app/analytics/creator/creator.component';
import { TableComponent } from '@app/analytics/table/table.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CreatorComponent, TableComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {}
