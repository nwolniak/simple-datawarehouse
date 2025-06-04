import {Component} from '@angular/core';
import {DimDraggable} from "@app/_models";
import {AnalyticsService, DragDropService, MetadataService} from "@app/_services";
import {DragDropModule} from "primeng/dragdrop";
import {ToolbarModule} from "primeng/toolbar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MessageService} from "primeng/api";
import {MultiSelectModule} from "primeng/multiselect";
import {DimDraggableItemComponent} from "@app/analytics2/dim-draggable-item/dim-draggable-item.component";

@Component({
  selector: 'app-column-dim-selector',
  standalone: true,
  imports: [
    DragDropModule,
    ToolbarModule,
    MultiSelectModule,
    DimDraggableItemComponent
  ],
  templateUrl: './column-dim-selector.component.html',
  styleUrl: './column-dim-selector.component.css'
})
export class ColumnDimSelectorComponent {

  dimTables: DimDraggable[] = [];

  constructor(
    private metadataService: MetadataService,
    private analyticsService: AnalyticsService,
    private dragDropService: DragDropService,
    private messageService: MessageService,
  ) {
    this.analyticsService.columnDimTables$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (dimTables: DimDraggable[]) => {
          this.dimTables = dimTables;
        }
      )
  }

  onDragStart(draggedItem: DimDraggable) {
    this.dragDropService.startDragging(draggedItem);
  }

  onDragEnd() {
    const draggedItem = this.dragDropService.getDraggedItem();
    if (!draggedItem || !(draggedItem instanceof DimDraggable)) {
      return;
    }
    if (!this.dragDropService.selfDropEventHappened && this.dragDropService.wasDroppedSuccessfully) {
      this.dimTables = this.dimTables.filter(dimTable => dimTable.tableMetadata.tableName !== draggedItem.tableMetadata.tableName);
      this.analyticsService.setColumnDimTables(this.dimTables);
    }
    this.dragDropService.clear();
  }

  onDrop() {
    const draggedItem = this.dragDropService.getDraggedItem();
    if (!draggedItem || !(draggedItem instanceof DimDraggable)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'It can not be dropped here. Please select a column assignable item'
      });
      return;
    }
    const selfDropEventHappened = this.dimTables.some(dimTable => dimTable.tableMetadata.tableName == draggedItem.tableMetadata.tableName);
    if (selfDropEventHappened) {
      this.dragDropService.setSelfDropEventHappened();
      return;
    }
    this.dimTables = [...this.dimTables, draggedItem];
    this.analyticsService.setColumnDimTables(this.dimTables);
    this.dragDropService.setWasDroppedSuccessfully();
  }
}
