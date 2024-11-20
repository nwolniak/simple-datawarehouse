export interface Metadata {
  host: string;
  database: string;
  tables: TableMetadata[];
  factTables: TableMetadata[];
  dimTables: Map<string, TableMetadata[]>;

  metadataCollapsed?: boolean;
  tablesCollapsed?: boolean;
  factTablesCollapsed?: boolean;
  dimensionsCollapsed?: boolean;
}

export interface TableMetadata {
  tableName: string;
  columnsMetadata: ColumnMetadata[];
  primaryKeysMetadata: PrimaryKeyMetadata[];
  foreignKeysMetadata: ForeignKeyMetadata[];

  tableCollapsed?: boolean;
  columnsCollapsed?: boolean;
  primaryKeysCollapsed?: boolean;
  foreignKeysCollapsed?: boolean;
}

export interface ColumnMetadata {
  name: string;
  size: string;
  type: string;
  isNullable: boolean;
  isAutoincrement: boolean;

  isChecked?: boolean;
}

export interface ForeignKeyMetadata {
  foreignKeyName: string;
  primaryKeyTableName: string;
  primaryKeyColumnName: string;
  foreignKeyTableName: string;
  foreignKeyColumnName: string;
}

export interface PrimaryKeyMetadata {
  columnName: string;
  primaryKeyName: string;
}
