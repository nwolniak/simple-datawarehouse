import {Component} from '@angular/core';
import {DragDropModule} from "primeng/dragdrop";
import {AnalyticsService} from "@app/_services";
import {AggregateDraggable, Draggable} from "@app/_models";
import {ToolbarModule} from "primeng/toolbar";
import {AccordionModule} from "primeng/accordion";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {OrderListModule} from "primeng/orderlist";
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-aggregate-selector',
  standalone: true,
  imports: [
    DragDropModule,
    ToolbarModule,
    AccordionModule,
    OrderListModule
  ],
  templateUrl: './aggregate-selector.component.html',
  styleUrl: './aggregate-selector.component.css'
})
export class AggregateSelectorComponent {

  aggregates: AggregateDraggable[] = [];

  constructor(private analyticsService: AnalyticsService) {
    this.analyticsService.aggregates$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (aggregates: AggregateDraggable[]) => {
          this.aggregates = aggregates;
        }
      )
  }

  onDrop(event: CdkDragDrop<Draggable[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.aggregates, event.previousIndex, event.currentIndex);
      this.analyticsService.setAggregates(this.aggregates);
    } else {
      switch (event.previousContainer.id) {
        case 'draggables-container':
          let draggables = this.analyticsService.getAvailableDraggables()!;
          transferArrayItem(draggables, this.aggregates, event.previousIndex, event.currentIndex);
          this.analyticsService.setAvailableDraggables(draggables);
          this.analyticsService.setAggregates(this.aggregates);
          break;
        default:
          console.error("Unknown container for drag drop");
          break;
      }
    }
  }

  isAggregateDragged = (drag: CdkDrag): boolean => {
    return drag.data instanceof AggregateDraggable;
  }

}
