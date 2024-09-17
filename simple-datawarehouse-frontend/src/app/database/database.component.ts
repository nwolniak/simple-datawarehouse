import { Component } from '@angular/core';
import { MetadataListComponent } from '@app/database/metadata-list/metadata-list.component';
import { TableViewComponent } from '@app/database/table/table-view.component';

@Component({
  selector: 'app-database-layout',
  standalone: true,
  imports: [MetadataListComponent, TableViewComponent, TableViewComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css',
})
export class DatabaseComponent {}
