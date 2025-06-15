export class Metadata {
  public metadataCollapsed?: boolean = false;
  public tablesCollapsed?: boolean = false;
  public factTablesCollapsed?: boolean = false;
  public dimensionsCollapsed?: boolean = false;
  constructor(
    public host: string,
    public database: string,
    public tables: TableMetadata[],
    public factTables: TableMetadata[],
    public dimTables: Map<string, TableMetadata[]>
  ) {
  }
}

export class TableMetadata {
  public tableCollapsed?: boolean;
  public columnsCollapsed?: boolean;
  public primaryKeysCollapsed?: boolean;
  public foreignKeysCollapsed?: boolean;
  constructor(
    public tableName: string,
    public columnsMetadata: ColumnMetadata[],
    public primaryKeysMetadata: PrimaryKeyMetadata[],
    public foreignKeysMetadata: ForeignKeyMetadata[]
  ) {
  }
}

export interface ColumnMetadata {
  name: string;
  size: string;
  type: string;
  isNullable: boolean;
  isAutoincrement: boolean;
  isAggregate: boolean;

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
