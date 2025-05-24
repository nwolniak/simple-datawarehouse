import {Component} from '@angular/core';
import {DragDropModule} from "primeng/dragdrop";
import {AnalyticsService, DragDropService, MetadataService} from "@app/_services";
import {AggregateDraggable} from "@app/_models";
import {ToolbarModule} from "primeng/toolbar";
import {AccordionModule} from "primeng/accordion";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-aggregate-selector',
  standalone: true,
  imports: [
    DragDropModule,
    ToolbarModule,
    AccordionModule
  ],
  templateUrl: './aggregate-selector.component.html',
  styleUrl: './aggregate-selector.component.css'
})
export class AggregateSelectorComponent {

  aggregates: AggregateDraggable[] = [];

  constructor(
    private metadataService: MetadataService,
    private analyticsService: AnalyticsService,
    private dragDropService: DragDropService,
    private messageService: MessageService,
    ) {
    this.analyticsService.aggregates$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (aggregates: AggregateDraggable[]) => {
          this.aggregates = aggregates;
        }
      )
  }

  onDragStart(draggedItem: AggregateDraggable) {
    this.dragDropService.startDragging(draggedItem);
  }

  onDragEnd() {
    const draggedItem = this.dragDropService.getDraggedItem();
    if (!draggedItem || !(draggedItem instanceof AggregateDraggable)) {
      return;
    }
    if (!this.dragDropService.selfDropEventHappened && this.dragDropService.wasDroppedSuccessfully) {
      this.aggregates = this.aggregates.filter(aggregate => aggregate.item !== draggedItem.item);
      this.analyticsService.setAggregates(this.aggregates);
    }
    this.dragDropService.clear();
  }

  onDrop() {
    const draggedItem = this.dragDropService.getDraggedItem();
    if (!draggedItem || !(draggedItem instanceof AggregateDraggable)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'It can not be dropped here. Please select aggregate assignable item'
      });
      return;
    }
    const selfDropEventHappened = this.aggregates.some(aggregate => aggregate.item == draggedItem.item);
    if (selfDropEventHappened) {
      this.dragDropService.setSelfDropEventHappened();
      return;
    }
    this.aggregates = [...this.aggregates, draggedItem];
    this.analyticsService.setAggregates(this.aggregates);
    this.dragDropService.setWasDroppedSuccessfully();
  }
}
