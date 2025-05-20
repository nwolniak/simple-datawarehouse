export interface PivotTable {
  rowLabelList: string[];
  rowLabelMap: Map<string, number>;
  columnLabelList: Map<string, number>[];
  rowList: Map<string, any>[];
}
