import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {
  Column,
  ColumnFilter,
  ColumnSelectable,
  Condition,
  DimDraggable,
  Join,
  OrderBy,
  PivotTable,
  PivotTableQuery,
  TableMetadata
} from "@app/_models";
import {environment} from "@environments/environment";
import {AnalyticsService} from "@app/_services/analytics.service";

@Injectable({
  providedIn: 'root'
})
export class PivotQueryService {

  private querySubject: BehaviorSubject<PivotTableQuery>;
  query$: Observable<PivotTableQuery>;

  private pivotTableSubject: BehaviorSubject<PivotTable | null>;
  pivotTable$: Observable<PivotTable | null>;

  constructor(
    private http: HttpClient,
    private analyticsService: AnalyticsService
  ) {
    let query: PivotTableQuery = new PivotTableQuery();
    this.querySubject = new BehaviorSubject<PivotTableQuery>(query);
    this.query$ = this.querySubject.asObservable();

    this.pivotTableSubject = new BehaviorSubject<PivotTable | null>(null);
    this.pivotTable$ = this.pivotTableSubject.asObservable();
  }

  sendPivotTableQuery(query: PivotTableQuery): void {
    this.querySubject.next(query);
    this.http.post<PivotTable>(`${environment.queryPivotDataUrl}`, query)
      .pipe(tap(() => console.info('PivotTableQuery request success.')))
      .subscribe((table: PivotTable) => {
          table.rowLabelMap = new Map(Object.entries(table.rowLabelMap ?? {}));
          this.pivotTableSubject.next(table);
        }
      );
  }

  preparePivotQuery(): PivotTableQuery {
    const factTable: TableMetadata = this.analyticsService.getFactTable()!;
    const table: string = factTable.tableName;
    const columns: Column[] = this.prepareQueryColumns(factTable);
    const whereList: Condition[] = this.prepareWhereStatements();
    const joins: Join[] = this.prepareJoins(factTable);
    const groupByList: string[] = this.prepareGroupByList(columns);
    const orderByList: OrderBy[] = this.prepareOrderByList(columns);

    const rowLabels = this.prepareQueryRowLabels();
    const columnLabels = this.prepareQueryColumnLabels();
    const aggregateLabels = this.prepareQueryAggregateLabels();
    const pivotQuery = this.querySubject.value;
    pivotQuery.query.table = table;
    pivotQuery.query.columnList = columns;
    pivotQuery.query.whereList = whereList;
    pivotQuery.query.joinList = joins;
    pivotQuery.query.groupByList = groupByList;
    pivotQuery.query.orderByList = orderByList;
    pivotQuery.rowLabels = rowLabels;
    pivotQuery.columnLabels = columnLabels;
    pivotQuery.valueLabels = aggregateLabels;
    return pivotQuery;
  }

  private prepareQueryColumns(factTable: TableMetadata): Column[] {
    // Row + Column Selections
    const rowColItems: Column[] = [...this.analyticsService.getRowDimTables(), ...this.analyticsService.getColumnDimTables()]
      .flatMap((dimDraggable: DimDraggable) => {
        let columnsSelected = dimDraggable.selectedColumns
          .filter((column: ColumnSelectable) => column.selected);
        return columnsSelected.map(columnSelected => new Column(
          dimDraggable.tableName + "." + columnSelected.columnName,
          columnSelected.columnName,
          "None"
        ))
      });
    // Aggregate Selections
    const aggregateItems: Column[] = this.analyticsService.getAggregates()
      .map(draggable => draggable.item)
      .map(aggregatedItem => new Column(
        factTable.tableName + "." + aggregatedItem,
        aggregatedItem,
        "SUM"
      ));
    return [...rowColItems, ...aggregateItems];
  }

  private prepareWhereStatements(): Condition[] {
    return [...this.analyticsService.getRowDimTables(), ...this.analyticsService.getColumnDimTables()]
      .flatMap((dimDraggable: DimDraggable) => {
        return dimDraggable.columnFilters.map((columnFilter: ColumnFilter) => new Condition(
            columnFilter.columnName,
            columnFilter.operator,
            columnFilter.value
          )
        )
      });
  }

  private prepareJoins(factTable: TableMetadata): Join[] {
    return [...this.analyticsService.getRowDimTables(), ...this.analyticsService.getColumnDimTables()]
      .map((dimDraggable: DimDraggable) => {
        let conditions: Condition[] = [new Condition(
          this.leftOperand(factTable, dimDraggable.tableMetadata),
          "=",
          this.rightOperand(factTable, dimDraggable.tableMetadata)
        )];
        return new Join(
          "INNER",
          dimDraggable.tableName,
          conditions
        );
      });
  }

  private prepareGroupByList(columns: Column[]): string[] {
    return columns
      .filter(column => column.aggregate == 'None')
      .map(column => column.name);
  }

  private prepareOrderByList(columns: Column[]): OrderBy[] {
    return columns
      .filter(column => column.aggregate == 'None')
      .map(column => new OrderBy(
        column.name,
        true
      ))
  }

  private prepareQueryRowLabels(): string[] {
    return this.analyticsService.getRowDimTables()
      .flatMap((dimDraggable: DimDraggable) => dimDraggable.selectedColumns)
      .filter((columnSelected: ColumnSelectable) => columnSelected.selected)
      .map((columnSelected: ColumnSelectable) => columnSelected.columnName);
  }

  private prepareQueryColumnLabels(): string[] {
    return this.analyticsService.getColumnDimTables()
      .flatMap((dimDraggable: DimDraggable) => dimDraggable.selectedColumns)
      .filter((columnSelected: ColumnSelectable) => columnSelected.selected)
      .map((columnSelected: ColumnSelectable) => columnSelected.columnName);
  }

  private prepareQueryAggregateLabels(): string[] {
    return this.analyticsService.getAggregates().map(draggable => draggable.item);
  }

  private leftOperand(factTable: TableMetadata, dimTable: TableMetadata): string {
    const foreignKeyMetadata = factTable.foreignKeysMetadata.find(
      (foreignKeyMetadata) =>
        foreignKeyMetadata.primaryKeyTableName === dimTable.tableName,
    );
    if (!foreignKeyMetadata) {
      return '';
    }
    return foreignKeyMetadata.foreignKeyTableName + '.' + foreignKeyMetadata.foreignKeyColumnName;
  }

  private rightOperand(factTable: TableMetadata, dimTable: TableMetadata): string {
    const foreignKeyMetadata = factTable.foreignKeysMetadata.find(
      (foreignKeyMetadata) =>
        foreignKeyMetadata.primaryKeyTableName === dimTable.tableName,
    );
    if (!foreignKeyMetadata) {
      return '';
    }
    return foreignKeyMetadata.primaryKeyTableName + '.' + foreignKeyMetadata.primaryKeyColumnName;
  }

  clear() {
    this.pivotTableSubject.next(null);
  }

}
