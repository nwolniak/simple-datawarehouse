export interface PivotTable {
  rowLabelMap: Map<string, number>;
  columnLabelList: Map<string, number>[];
  rowList: Map<string, any>[];
}
