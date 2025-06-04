import {QueryResult} from "@app/_models/query/query-result";

export interface PivotTable {
  queryResult: QueryResult;
  rowLabelList: string[];
  rowLabelMap: Map<string, number>;
  columnLabelList: Map<string, number>[];
  rowList: Map<string, any>[];
  isPivoted: boolean;
}
