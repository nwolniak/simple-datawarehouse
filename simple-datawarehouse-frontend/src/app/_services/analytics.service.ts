import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AggregateDraggable, DimDraggable, Draggable, TableMetadata} from "@app/_models";
import {moveItemInArray} from "@angular/cdk/drag-drop";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private factTableSubject = new BehaviorSubject<TableMetadata | null>(null);
  public factTable$ = this.factTableSubject.asObservable();

  private availableDraggablesSubject = new BehaviorSubject<Draggable[] | null>(null);
  public availableDraggables$ = this.availableDraggablesSubject.asObservable();

  private rowDimTablesSubject = new BehaviorSubject<DimDraggable[]>(Array.of());
  public rowDimTables$ = this.rowDimTablesSubject.asObservable();

  private columnDimTablesSubject = new BehaviorSubject<DimDraggable[]>(Array.of());
  public columnDimTables$ = this.columnDimTablesSubject.asObservable();

  private aggregatesSubject = new BehaviorSubject<AggregateDraggable[]>(Array.of());
  public aggregates$ = this.aggregatesSubject.asObservable();

  setFactTable(factTable: TableMetadata): void {
    this.factTableSubject.next(factTable);
  }

  getFactTable(): TableMetadata | null {
    return this.factTableSubject.value;
  }

  setAvailableDraggables(draggables: Draggable[]): void {
    this.availableDraggablesSubject.next(draggables);
  }

  getAvailableDraggables(): Draggable[] | null {
    return this.availableDraggablesSubject.value;
  }

  setRowDimTables(dimTables: DimDraggable[]): void {
    this.rowDimTablesSubject.next(dimTables);
  }

  getRowDimTables(): DimDraggable[] {
    return this.rowDimTablesSubject.value;
  }

  setColumnDimTables(dimTables: DimDraggable[]): void {
    this.columnDimTablesSubject.next(dimTables);
  }

  getColumnDimTables(): DimDraggable[] {
    return this.columnDimTablesSubject.value;
  }

  setAggregates(aggregates: AggregateDraggable[]): void {
    this.aggregatesSubject.next(aggregates);
  }

  getAggregates(): AggregateDraggable[] {
    return this.aggregatesSubject.value;
  }

  clear(): void {
    this.factTableSubject.next(null);
    this.availableDraggablesSubject.next(null);
    this.rowDimTablesSubject.next(Array.of());
    this.columnDimTablesSubject.next(Array.of());
    this.aggregatesSubject.next(Array.of());
  }

}
