import {Column} from '@app/_models/query/query';

export class Table {
  constructor(
    public tableName: string = '',
    public columnList: string[] = Array.of(),
    public rowList: TableRow[] = Array.of(),
    public columnOptions: Column[] = Array.of(),
    public selectedColumns: Column[] = Array.of(),
    public selectedRows: TableRow[] = Array.of(),
    public query: string = ''
  ) {
  }
}

export type TableRow = Record<string, any>;
