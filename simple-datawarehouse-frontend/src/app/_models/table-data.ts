import { Column } from '@app/_models/query';

export interface Table {
  tableName: string;
  columnList: string[];
  rowList: TableRow[];
  columnOptions: Column[];
  selectedColumns: Column[];
  selectedRows: TableRow[];
  query: string;
}

export type TableRow = Record<string, any>;
