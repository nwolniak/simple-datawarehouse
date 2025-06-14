import {Query} from "@app/_models/query/query";

export class PivotTableQuery {
  constructor(
    public query: Query = {} as Query,
    public rowLabels: string[] = Array.of(),
    public columnLabels: string[] = Array.of(),
    public valueLabels: string[] = Array.of()
  ) {
  }

  hasRequiredSearchData(): boolean {
    if (this.rowLabels.length === 0
      && this.columnLabels.length === 0
      && this.valueLabels.length === 0) {
      return false;
    }
    return true;
  }
}
