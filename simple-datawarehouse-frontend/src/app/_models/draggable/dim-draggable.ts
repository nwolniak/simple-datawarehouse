import {TableMetadata} from "@app/_models";

export class DimDraggable {
  constructor(
    public tableMetadata: TableMetadata,
    public tableName: string,
    public selectedColumns: ColumnSelectable[],
    public columnFilters: ColumnFilter[] = []
  ) {}
}

export class ColumnSelectable {
  constructor(
    public columnName: string,
    public type: string,
    public selected: boolean = false
  ) {}
}

export class ColumnFilter {
  constructor(
    public columnName: string,
    public operator: string,
    public value: string
    ) {
  }

}
