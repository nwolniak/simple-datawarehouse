export interface Metadata {
  host: string;
  database: string;
  tables: TableMetadata[]
  metadataCollapsed?: boolean;
  tablesCollapsed?: boolean;
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
}

export interface ForeignKeyMetadata {
  primaryKeyTableName: string;
  primaryKeyColumnName: string;
  foreignKeyTableName: string;
  foreignKeyColumnName: string;
}

export interface PrimaryKeyMetadata {
  columnName: string;
  primaryKeyName: string;
}
