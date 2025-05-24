import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "@app/_services/alert.service";
import {BehaviorSubject, catchError, Observable, Subscription, tap, throwError} from "rxjs";
import {Column, Condition, Join, OrderBy, PivotTable, PivotTableQuery, TableMetadata} from "@app/_models";
import {environment} from "@environments/environment";
import {AnalyticsService} from "@app/_services/analytics.service";

@Injectable({
  providedIn: 'root'
})
export class PivotQueryService {

  dimMappings = new Map(Object.entries({
    "dim_time": "year",
    "dim_products": "product_name",
    "dim_customers": "last_name",
    "dim_addresses": "city"
  }));

  private querySubject: BehaviorSubject<PivotTableQuery>;
  query: Observable<PivotTableQuery>;

  private pivotTableSubject: BehaviorSubject<PivotTable | null>;
  pivotTable: Observable<PivotTable | null>;

  constructor(
    private http: HttpClient,
    private analyticsService: AnalyticsService,
    private alertService: AlertService,
  ) {
    let query: PivotTableQuery = {
      query: {
        columnList: [],
        table: '',
        groupByList: [],
        havingList: [],
        joinList: [],
        orderByList: [],
        whereList: [],
      },
      rowLabels: [],
      columnLabels: [],
      valueLabels: [],
    };
    this.querySubject = new BehaviorSubject<PivotTableQuery>(query);
    this.query = this.querySubject.asObservable();

    this.pivotTableSubject = new BehaviorSubject<PivotTable | null>(null);
    this.pivotTable = this.pivotTableSubject.asObservable();
  }

  sendPivotTableQuery(): Subscription {
    this.preparePivotQuery();
    return this.http.post<PivotTable>(`${environment.queryPivotDataUrl}`, this.querySubject.value)
      .pipe(
        tap(() => console.info('PivotTableQuery request success.')),
        catchError((error: HttpErrorResponse) => {
          console.error('PivotTableQuery request error:', error.error);
          return throwError(() => error);
        }))
      .subscribe({
        next: (table: PivotTable) => {
          table.rowLabelMap = new Map(Object.entries(table.rowLabelMap));
          this.pivotTableSubject.next(table);
        },
        error: (error: HttpErrorResponse) => {
          this.alertService.addAlert(error.error);
        },
      });
  }

  private preparePivotQuery(): void {
    const factTable: TableMetadata = this.analyticsService.getFactTable()!;
    const table: string = factTable.tableName;
    const columns: Column[] = this.prepareQueryColumns(factTable);
    const joins: Join[] = this.prepareJoins(factTable);
    const groupByList: string[] = this.prepareGroupByList(columns);
    const orderByList: OrderBy[] = this.prepareOrderByList(columns);

    const rowLabels = this.prepareQueryRowLabels();
    const columnLabels = this.prepareQueryColumnLabels();
    const aggregateLabels = this.prepareQueryAggregateLabels(factTable);
    const pivotQuery = this.querySubject.value;
    pivotQuery.query.table = table;
    pivotQuery.query.columnList = columns;
    pivotQuery.query.joinList = joins;
    pivotQuery.query.groupByList = groupByList;
    pivotQuery.query.orderByList = orderByList;
    pivotQuery.rowLabels = rowLabels;
    pivotQuery.columnLabels = columnLabels;
    pivotQuery.valueLabels = aggregateLabels;
    this.querySubject.next(pivotQuery);
  }

  private prepareQueryColumns(factTable: TableMetadata): Column[] {
    // Row + Column Selections
    const rowColItems: Column[] = [...this.analyticsService.getRowDimTables(), ...this.analyticsService.getColumnDimTables()]
      .map(draggable => draggable.item)
      .filter(tableMetadata => this.dimMappings.has(tableMetadata.tableName))
      .flatMap(tableMetadata => {
        let tableName = tableMetadata.tableName;
        let columnNames = tableMetadata.columnsMetadata
          .filter(columnMetadata => columnMetadata.name == this.dimMappings.get(tableName))
          .map(columnMetadata => columnMetadata.name);
        return columnNames.map(columnName => new Column(
          tableName + "." + columnName,
          columnName,
          "None"
        ));
      })
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

  private prepareJoins(factTable: TableMetadata): Join[] {
    const joinItems: Join[] = [...this.analyticsService.getRowDimTables(), ...this.analyticsService.getColumnDimTables()]
      .map(draggable => draggable.item)
      .filter(tableMetadata => this.dimMappings.has(tableMetadata.tableName))
      .map(tableMetadata => {
        let tableName = tableMetadata.tableName;
        let conditions: Condition[] = [new Condition(
          this.leftOperand(factTable, tableMetadata),
          "=",
          this.rightOperand(factTable, tableMetadata)
        )]
        return new Join(
          "INNER",
          tableName,
          conditions
        );
      })
    return joinItems;
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
    const dimsSelected = this.analyticsService.getRowDimTables().map(draggable => draggable.item);
    return dimsSelected
      .map(dimSelected => this.dimMappings.get(dimSelected.tableName)!);
  }

  private prepareQueryColumnLabels(): string[] {
    const dimsSelected = this.analyticsService.getColumnDimTables().map(draggable => draggable.item);
    return dimsSelected
      .map(dimSelected => this.dimMappings.get(dimSelected.tableName)!);
  }

  private prepareQueryAggregateLabels(factTable: TableMetadata): string[] {
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
