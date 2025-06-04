import {Component, Type} from '@angular/core';
import {AnalyticsService, DragDropService} from "@app/_services";
import {AggregateDraggable, DimDraggable, Draggable, Metadata} from "@app/_models";
import {DragDropModule} from "primeng/dragdrop";
import {ToolbarModule} from "primeng/toolbar";
import {filter} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-draggables-container',
  standalone: true,
  imports: [
    DragDropModule,
    ToolbarModule
  ],
  templateUrl: './draggables-container.component.html',
  styleUrl: './draggables-container.component.css'
})
export class DraggablesContainerComponent {

  draggables: Draggable[] = [];

  constructor(
    private analyticsService: AnalyticsService,
    private dragDropService: DragDropService) {
    this.analyticsService.availableDraggables$
      .pipe(takeUntilDestroyed())
      .pipe(
        filter((draggables): draggables is Draggable[] => !!draggables)
      )
      .subscribe(
        (draggables) => {
          this.draggables = draggables;
        })
  }

  onDragStart(draggedItem: Draggable) {
    this.dragDropService.startDragging(draggedItem);
  }

  onDragEnd() {
    const draggedItem = this.dragDropService.getDraggedItem();
    if (!draggedItem) {
      return;
    }
    if (!this.dragDropService.selfDropEventHappened && this.dragDropService.wasDroppedSuccessfully) {
      this.draggables = this.draggables.reduce((accumulatedDraggables, draggable) => {
        if (draggable instanceof DimDraggable) {
          if (draggable.tableMetadata.tableName !== (draggedItem as DimDraggable).tableMetadata.tableName) {
            accumulatedDraggables.push(draggable);
          }
        } else if (draggable instanceof AggregateDraggable) {
          if (draggable.item !== (draggedItem as AggregateDraggable).item) {
            accumulatedDraggables.push(draggable);
          }
        }
        return accumulatedDraggables;
      }, [] as (DimDraggable | AggregateDraggable)[]);
      this.analyticsService.setAvailableDraggables(this.draggables);
    }
    this.dragDropService.clear();
  }

  onDrop() {
    const draggedItem = this.dragDropService.getDraggedItem();
    if (!draggedItem) {
      return;
    }
    const selfDropEventHappened = this.draggables.some((draggable) =>
      (draggable instanceof DimDraggable && draggable.tableMetadata.tableName === (draggedItem as DimDraggable).tableMetadata.tableName) ||
      (draggable instanceof AggregateDraggable && draggable.item === (draggedItem as AggregateDraggable).item)
    );
    if (selfDropEventHappened) {
      this.dragDropService.setSelfDropEventHappened();
      return;
    }
    this.draggables = [...this.draggables, draggedItem];
    this.analyticsService.setAvailableDraggables(this.draggables);
    this.dragDropService.setWasDroppedSuccessfully();
  }

  protected instanceof(draggable: Draggable, type: Type<any>): boolean {
    return draggable instanceof type;
  }

  protected dimLabel(draggable: Draggable): string {
    return (draggable as DimDraggable).tableName;
  }

  protected aggregateLabel(draggable: Draggable): string {
    return (draggable as AggregateDraggable).item;
  }

  protected readonly DimDraggable = DimDraggable;
  protected readonly AggregateDraggable = AggregateDraggable;
}
