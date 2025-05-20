import {Component} from '@angular/core';
import {PivotTable} from "@app/_models";
import {TableModule} from "primeng/table";
import {KeyValuePipe, SlicePipe} from "@angular/common";
import {LastKeyPipe} from "@app/_pipes";
import {PivotQueryService} from "@app/_services";
import {filter} from "rxjs";

@Component({
  selector: 'app-pivot-table',
  standalone: true,
  imports: [
    TableModule,
    KeyValuePipe,
    SlicePipe,
    LastKeyPipe,
  ],
  templateUrl: './pivot-table.component.html',
  styleUrl: './pivot-table.component.css'
})
export class PivotTableComponent {

  pivotTable!: PivotTable;

  constructor(private pivotTableService: PivotQueryService) {
    this.pivotTableService.pivotTable
      .pipe(
        filter((pivotTable): pivotTable is PivotTable => !!pivotTable)
      )
      .subscribe((pivotTable: PivotTable) => {
          this.pivotTable = pivotTable;
          console.log(this.pivotTable);
        }
      )
  }

  protected checkRowLabelIsAvailable(key: string, value: string): boolean {
    let keyValue = key + "=" + value;
    return this.pivotTable.rowLabelMap.has(keyValue);
  }

  protected getRowLabelSize(key: string, value: string): number {
    let keyValue = key + "=" + value;
    let result: number = this.pivotTable.rowLabelMap.get(keyValue)!;
    return result;
  }

  isSameAsPrevious(rowIndex: number, key: string): boolean {
    if (rowIndex === 0) return false;
    const currMap = new Map(Object.entries(this.pivotTable.rowList[rowIndex]));
    const prevMap = new Map(Object.entries(this.pivotTable.rowList[rowIndex - 1]));
    const current = currMap.get(key);
    const previous = prevMap.get(key);
    return current === previous;
  }

  protected unsorted = () => 0;

  protected readonly String = String;
}
