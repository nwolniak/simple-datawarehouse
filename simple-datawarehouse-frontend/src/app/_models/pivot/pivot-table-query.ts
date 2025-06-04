import {Query} from "@app/_models/query/query";

export interface PivotTableQuery {
  query: Query;
  rowLabels: string[];
  columnLabels: string[];
  valueLabels: string[];
}
