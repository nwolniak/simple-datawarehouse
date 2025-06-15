import {Component, Type} from '@angular/core';
import {AnalyticsService} from "@app/_services";
import {AggregateDraggable, DimDraggable, Draggable} from "@app/_models";
import {DragDropModule} from "primeng/dragdrop";
import {ToolbarModule} from "primeng/toolbar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {OrderListModule} from "primeng/orderlist";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-draggables-container',
  standalone: true,
  imports: [
    DragDropModule,
    ToolbarModule,
    OrderListModule
  ],
  templateUrl: './draggables-container.component.html',
  styleUrl: './draggables-container.component.css'
})
export class DraggablesContainerComponent {

  draggables!: Draggable[];

  constructor(private analyticsService: AnalyticsService) {
    this.analyticsService.availableDraggables$
      .pipe(takeUntilDestroyed())
      .subscribe((draggables) => {
        this.draggables = draggables;
      });
  }

  onDrop(event: CdkDragDrop<Draggable[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.draggables, event.previousIndex, event.currentIndex);
      this.analyticsService.setAvailableDraggables(this.draggables);
    } else {
      switch (event.previousContainer.id) {
        case 'column-selector':
          let columnDimTables = this.analyticsService.getColumnDimTables();
          transferArrayItem(columnDimTables, this.draggables, event.previousIndex, event.currentIndex);
          this.analyticsService.setAvailableDraggables(this.draggables);
          this.analyticsService.setColumnDimTables(columnDimTables);
          break;
        case 'row-selector':
          let rowDimTables = this.analyticsService.getRowDimTables();
          transferArrayItem(rowDimTables, this.draggables, event.previousIndex, event.currentIndex);
          this.analyticsService.setAvailableDraggables(this.draggables);
          this.analyticsService.setRowDimTables(rowDimTables);
          break;
        case 'aggregate-selector':
          let aggregates = this.analyticsService.getAggregates();
          transferArrayItem(aggregates, this.draggables, event.previousIndex, event.currentIndex);
          this.analyticsService.setAvailableDraggables(this.draggables);
          this.analyticsService.setAggregates(aggregates);
          break;
        default:
          console.error("Unknown container for drag drop");
          break;
      }
    }
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
