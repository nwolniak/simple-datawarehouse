import {Component} from '@angular/core';
import {DragDropModule} from "primeng/dragdrop";
import {AnalyticsService} from "@app/_services";
import {DimDraggable, Draggable} from "@app/_models";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DimDraggableItemComponent} from "@app/analytics/dim-draggable-item/dim-draggable-item.component";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-row-dim-selector',
  standalone: true,
  imports: [
    DragDropModule,
    CardModule,
    ToolbarModule,
    DimDraggableItemComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './row-dim-selector.component.html',
  styleUrl: './row-dim-selector.component.css'
})
export class RowDimSelectorComponent {

  dimTables: DimDraggable[] = [];

  constructor(private analyticsService: AnalyticsService) {
    this.analyticsService.rowDimTables$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (dimTables: DimDraggable[]) => {
          this.dimTables = dimTables;
        }
      )
  }

  onDrop(event: CdkDragDrop<Draggable>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.dimTables, event.previousIndex, event.currentIndex);
      this.analyticsService.setRowDimTables(this.dimTables);
    } else {
      switch (event.previousContainer.id) {
        case 'draggables-container':
          let draggables = this.analyticsService.getAvailableDraggables()!;
          transferArrayItem(draggables, this.dimTables, event.previousIndex, event.currentIndex);
          this.analyticsService.setAvailableDraggables(draggables);
          this.analyticsService.setRowDimTables(this.dimTables);
          break;
        case 'column-selector':
          let columnDimTables = this.analyticsService.getColumnDimTables();
          transferArrayItem(columnDimTables, this.dimTables, event.previousIndex, event.currentIndex);
          this.analyticsService.setColumnDimTables(columnDimTables);
          this.analyticsService.setRowDimTables(this.dimTables);
          break;
        default:
          console.error("Unknown container for drag drop");
          break;
      }
    }
  }

  isDimDragged = (drag: CdkDrag): boolean => {
    return drag.data instanceof DimDraggable;
  }
}
