import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Metadata, TableMetadata} from "@app/_models";

@Component({
  selector: 'app-database-list',
  standalone: true,
  imports: [
    NgForOf,
    NgTemplateOutlet,
    NgIf,
    NgClass
  ],
  templateUrl: './database.list.component.html',
  styleUrl: './database.list.component.css'
})
export class DatabaseListComponent {

  @Input()
  metadata?: Metadata;

  toggleMetadata(metadata: Metadata) {
    metadata.metadataCollapsed = !metadata.metadataCollapsed;
    metadata.tablesCollapsed = false;
  }

  toggleTablesCollapse(metadata: Metadata) {
    metadata.tablesCollapsed = !metadata.tablesCollapsed;
    metadata.tables.forEach(table => {
      table.tableCollapsed = false;
      table.columnsCollapsed = false;
      table.primaryKeysCollapsed = false;
      table.foreignKeysCollapsed = false;
    })
  }

  toggleTableCollapse(table: TableMetadata) {
    table.tableCollapsed = !table.tableCollapsed;
    table.columnsCollapsed = false;
    table.primaryKeysCollapsed = false;
    table.foreignKeysCollapsed = false;
  }

  toggleColumnsCollapse(table: TableMetadata) {
    table.columnsCollapsed = !table.columnsCollapsed;
  }

  togglePrimaryKeysCollapse(table: TableMetadata) {
    table.primaryKeysCollapsed = !table.primaryKeysCollapsed;
  }

  toggleForeignKeysCollapse(table: TableMetadata) {
    table.foreignKeysCollapsed = !table.foreignKeysCollapsed;
  }

}
