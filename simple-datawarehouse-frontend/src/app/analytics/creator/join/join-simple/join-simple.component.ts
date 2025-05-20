import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { TableMetadata } from '@app/_models';
import { BaseCreatorComponent } from '@app/analytics/creator/base-creator/base-creator.component';

@Component({
  selector: 'app-join-simple',
  standalone: true,
  imports: [TableModule, DropdownModule, PaginatorModule],
  templateUrl: './join-simple.component.html',
  styleUrl: './join-simple.component.css',
})
export class JoinSimpleComponent extends BaseCreatorComponent {
  joinTableOptions(index: number): string[] {
    let columnOptions: string[] = [];
    if (!this.metadata) {
      return columnOptions;
    }
    const nonAvailableJoinTables = [
      ...this.query.joinList.slice(0, index),
      ...this.query.joinList.slice(index + 1),
    ];
    this.metadata.tables
      .filter(
        (table) =>
          !nonAvailableJoinTables
            .map((join) => join.tableName)
            .includes(table.tableName),
      )
      .filter((table) => !(this.fromTable == table))
      .map((table) => table.tableName)
      .forEach((tableName) => columnOptions.push(tableName));
    return columnOptions;
  }

  joinedTableChange(tableName: string, index: number) {
    if (!this.metadata || !this.fromTable) {
      return;
    }
    const table = this.metadata.tables.find(
      (table) => table.tableName === tableName,
    );
    if (!table) {
      return;
    }
    if (this.joinedTables.length == index) {
      this.joinedTables.push(table);
    } else {
      this.joinedTables[index] = table;
    }
    this.joinedTablesService.changeJoinedTables(this.joinedTables);
    this.query.joinList[index].tableName = table.tableName;
    this.query.joinList[index].conditions[0].leftOperand = this.leftOperand(
      this.fromTable,
      table,
    );
    this.query.joinList[index].conditions[0].rightOperand = this.rightOperand(
      this.fromTable,
      table,
    );
    this.queryService.updateQuery(this.query);
  }

  leftOperand(factTable: TableMetadata, dimTable: TableMetadata): string {
    const foreignKeyMetadata = factTable.foreignKeysMetadata.find(
      (foreignKeyMetadata) =>
        foreignKeyMetadata.primaryKeyTableName === dimTable.tableName,
    );
    if (!foreignKeyMetadata) {
      return '';
    }
    return (
      foreignKeyMetadata.foreignKeyTableName +
      '.' +
      foreignKeyMetadata.foreignKeyColumnName
    );
  }

  rightOperand(factTable: TableMetadata, dimTable: TableMetadata): string {
    const foreignKeyMetadata = factTable.foreignKeysMetadata.find(
      (foreignKeyMetadata) =>
        foreignKeyMetadata.primaryKeyTableName === dimTable.tableName,
    );
    if (!foreignKeyMetadata) {
      return '';
    }
    return (
      foreignKeyMetadata.primaryKeyTableName +
      '.' +
      foreignKeyMetadata.primaryKeyColumnName
    );
  }

  newJoinTable() {
    this.query.joinList.push({
      tableName: '',
      joinType: 'INNER',
      conditions: [{ leftOperand: '', operator: '=', rightOperand: '' }],
    });
    this.queryService.updateQuery(this.query);
  }

  deleteJoinTable(index: number) {
    this.joinedTables.splice(index, 1);
    this.query.joinList.splice(index, 1);
    this.joinedTablesService.changeJoinedTables(this.joinedTables);
    this.queryService.updateQuery(this.query);
  }

  buttonDisabled(): boolean {
    if (!this.metadata) {
      return true;
    }
    if (!this.fromTable) {
      return true;
    }
    if (
      this.query.joinList.length > 0 &&
      this.joinedTables.length < this.query.joinList.length
    ) {
      return true;
    }
    const dimTables = new Map<string, any[]>(
      Object.entries(this.metadata.dimTables),
    );
    return (
      this.joinedTables.length ===
      dimTables.get(this.fromTable.tableName)?.length
    );
  }
}
