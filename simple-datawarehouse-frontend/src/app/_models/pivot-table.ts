import {QueryResult} from "@app/_models/query-result";

export interface PivotTable {
  queryResult: QueryResult;
  rowLabelList: string[];
  rowLabelMap: Map<string, number>;
  columnLabelList: Map<string, number>[];
  rowList: Map<string, any>[];
}
