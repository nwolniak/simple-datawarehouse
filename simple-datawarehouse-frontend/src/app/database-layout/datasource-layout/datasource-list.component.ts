import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  templateUrl: './datasource-list.component.html',
  styleUrl: './datasource-list.component.css'
})
export class DatasourceListComponent {

  @Input()
  metadata?: Metadata;

  @Output()
  tableChosenEvent = new EventEmitter;

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

  toggleFactTablesCollapse(metadata: Metadata) {
    metadata.factTablesCollapsed = !metadata.factTablesCollapsed;
    metadata.factTables.forEach(factTable => {
      factTable.tableCollapsed = false;
      factTable.columnsCollapsed = false;
      factTable.primaryKeysCollapsed = false;
      factTable.foreignKeysCollapsed = false;
    })
  }

  toggleDimensionsCollapse(metadata: Metadata) {
    metadata.dimensionsCollapsed = !metadata.dimensionsCollapsed;
    Object.entries(metadata.dimTables).forEach(([key, value]) => {
      value.forEach((dimTable: TableMetadata) => {
        dimTable.tableCollapsed = false;
        dimTable.columnsCollapsed = false;
        dimTable.primaryKeysCollapsed = false;
        dimTable.foreignKeysCollapsed = false;
      });
    });
  }

  emitTableChosenEvent(table: string) {
    this.tableChosenEvent.emit(table);
  }

  getAllMetadata(metadata: Metadata): TableMetadata[] {
    return Object.entries(metadata.dimTables)
      .map(([key, value]) => value)
      .reduce((acc, curr) => acc.concat(curr), []);
  }

}