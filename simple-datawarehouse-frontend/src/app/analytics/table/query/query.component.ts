import { Component, OnInit } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { NgForOf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { QueryService } from '@app/_services';

@Component({
  selector: 'app-query-view',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    DataViewModule,
    DialogModule,
    NgForOf,
    PrimeTemplate,
    ToolbarModule,
    TooltipModule,
  ],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css',
})
export class QueryComponent implements OnInit {
  query: string[] = [''];
  queryVisible: boolean = false;

  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    this.queryService.table.subscribe(
      (table) => (this.query[0] = table.query.split('\n').join('\n')),
    );
  }

  showQuery() {
    this.queryVisible = true;
  }
}
