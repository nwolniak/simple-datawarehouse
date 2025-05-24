import {TableRow} from "@app/_models/table";

export class QueryResult {
  constructor(
    public columnList: string[],
    public rowList: TableRow[],
    public sql: string) {
  }
}
