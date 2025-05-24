import {Component} from '@angular/core';
import {DragDropModule} from "primeng/dragdrop";
import {AnalyticsService, DragDropService, MetadataService} from "@app/_services";
import {DimDraggable} from "@app/_models";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-row-dim-selector',
  standalone: true,
  imports: [
    DragDropModule,
    CardModule,
    ToolbarModule
  ],
  templateUrl: './row-dim-selector.component.html',
  styleUrl: './row-dim-selector.component.css'
})
export class RowDimSelectorComponent {

  dimTables: DimDraggable[] = [];

  constructor(
    private metadataService: MetadataService,
    private analyticsService: AnalyticsService,
    private dragDropService: DragDropService,
    private messageService: MessageService,
    ) {
    this.analyticsService.rowDimTables$
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
      this.dimTables = this.dimTables.filter(dimTable => dimTable.item.tableName !== draggedItem.item.tableName);
      this.analyticsService.setRowDimTables(this.dimTables);
    }
    this.dragDropService.clear();
  }

  onDrop() {
    const draggedItem = this.dragDropService.getDraggedItem();
    if (!draggedItem || !(draggedItem instanceof DimDraggable)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'It can not be dropped here. Please select a row assignable item'
      });
      return;
    }
    const selfDropEventHappened = this.dimTables.some(dimTable => dimTable.item.tableName == draggedItem.item.tableName);
    if (selfDropEventHappened) {
      this.dragDropService.setSelfDropEventHappened();
      return;
    }
    this.dimTables = [...this.dimTables, draggedItem];
    this.analyticsService.setRowDimTables(this.dimTables);
    this.dragDropService.setWasDroppedSuccessfully();
  }
}
