import {Component} from '@angular/core';
import {DimDraggable, Draggable} from "@app/_models";
import {AnalyticsService} from "@app/_services";
import {DragDropModule} from "primeng/dragdrop";
import {ToolbarModule} from "primeng/toolbar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MultiSelectModule} from "primeng/multiselect";
import {DimDraggableItemComponent} from "@app/analytics2/dim-draggable-item/dim-draggable-item.component";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-column-dim-selector',
  standalone: true,
  imports: [
    DragDropModule,
    ToolbarModule,
    MultiSelectModule,
    DimDraggableItemComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './column-dim-selector.component.html',
  styleUrl: './column-dim-selector.component.css'
})
export class ColumnDimSelectorComponent {

  dimTables: DimDraggable[] = [];

  constructor(private analyticsService: AnalyticsService) {
    this.analyticsService.columnDimTables$
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
      this.analyticsService.setColumnDimTables(this.dimTables);
    } else {
      switch (event.previousContainer.id) {
        case 'draggables-container':
          let draggables = this.analyticsService.getAvailableDraggables()!;
          transferArrayItem(draggables, this.dimTables, event.previousIndex, event.currentIndex);
          this.analyticsService.setAvailableDraggables(draggables);
          this.analyticsService.setColumnDimTables(this.dimTables);
          break;
        case 'row-selector':
          let rowDimTables = this.analyticsService.getRowDimTables();
          transferArrayItem(rowDimTables, this.dimTables, event.previousIndex, event.currentIndex);
          this.analyticsService.setRowDimTables(rowDimTables);
          this.analyticsService.setColumnDimTables(this.dimTables);
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
