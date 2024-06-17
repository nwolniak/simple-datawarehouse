export interface Table {
  tableName: string;
  columns: string[];
  rows: TableRow[];
  columnOptions: Record<string, string>[];
  selectedColumns: Record<string, string>[];
  selectedRows: TableRow[];
}

export type TableRow = Record<string, any>
