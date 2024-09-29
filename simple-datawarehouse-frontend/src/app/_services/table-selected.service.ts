import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableMetadata } from '@app/_models';

@Injectable({
  providedIn: 'root',
})
export class TableSelectedService {
  private tableSelectedSubject: BehaviorSubject<TableMetadata | undefined>;
  private readonly _tableSelected: Observable<TableMetadata | undefined>;

  constructor() {
    this.tableSelectedSubject = new BehaviorSubject<TableMetadata | undefined>(
      undefined,
    );
    this._tableSelected = this.tableSelectedSubject.asObservable();
  }

  public get table(): Observable<TableMetadata | undefined> {
    return this._tableSelected;
  }

  changeTable(table: TableMetadata): void {
    this.tableSelectedSubject.next(table);
  }
}
