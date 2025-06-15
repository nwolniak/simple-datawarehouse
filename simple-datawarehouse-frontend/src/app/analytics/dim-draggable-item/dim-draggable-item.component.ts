import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MultiSelect, MultiSelectModule} from "primeng/multiselect";
import {ColumnFilter, ColumnSelectable, DimDraggable} from "@app/_models";
import {FormsModule} from "@angular/forms";
import {OverlayPanel, OverlayPanelModule} from "primeng/overlaypanel";
import {Button} from "primeng/button";
import {MessageService} from "primeng/api";
import {ButtonGroupModule} from "primeng/buttongroup";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-dim-draggable-item',
  standalone: true,
  imports: [
    MultiSelectModule,
    FormsModule,
    OverlayPanelModule,
    Button,
    ButtonGroupModule,
    TableModule,
    DropdownModule,
    InputTextModule,
  ],
  templateUrl: './dim-draggable-item.component.html',
  styleUrl: './dim-draggable-item.component.css'
})
export class DimDraggableItemComponent implements OnInit {

  @ViewChild('multiSelect') multiSelect!: MultiSelect;
  @ViewChild('selectionOverlayPanel') selectionOverlayPanel!: OverlayPanel;
  @ViewChild('filterOverlayPanel') filterOverlayPanel!: OverlayPanel;
  @Input() dimDraggable!: DimDraggable;

  private stringFilters = [
    {label: 'Equals', value: 'equals'},
    {label: 'Contains', value: 'contains'},
    {label: 'Not Contains', value: 'notContains'},
    {label: 'Starts With', value: 'startsWith'},
    {label: 'Ends With', value: 'endsWith'}
  ];

  private numberFilters = [
    { label: 'Equals', value: 'numericEquals' },
    { label: 'Not Equals', value: 'numericNotEquals' },
    { label: 'Greater Than', value: 'numericGreaterThan' },
    { label: 'Greater Than or Equal', value: 'numericGreaterThanOrEqual' },
    { label: 'Less Than', value: 'numericLessThan' },
    { label: 'Less Than or Equal', value: 'numericLessThanOrEqual' }
  ];

  protected _selectableOptions: string[] = [];
  protected _selectedOptions: string[] = [];

  protected _selectedColumnForFiltering: string | null = null;
  protected _selectedFilter: string | null = null;
  protected _selectedFilterValue: string = "";

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this._selectableOptions = this.dimDraggable.selectedColumns
      .map(column => column.columnName);
    this._selectedOptions = this.dimDraggable.selectedColumns
      .filter(column => column.selected)
      .map(column => column.columnName);
  }

  onSelectButtonClick(event: any) {
    this.selectionOverlayPanel.toggle(event);
    if (this.selectionOverlayPanel.overlayVisible) {
      setTimeout(() => this.multiSelect.show());
    } else {
      setTimeout(() => this.multiSelect.hide());
    }
  }

  onFilterButtonClick(event: any) {
    this.filterOverlayPanel.toggle(event);
  }

  protected get filterButtonDisabled(): boolean {
    return this._selectedColumnForFiltering === null
      || this._selectedFilter === null
      || this._selectedFilterValue.length === 0;
  }

  filtersByType(): { label: string, value: string }[] {
    if (!this._selectedColumnForFiltering) {
      return Array.of();
    }
    let selectedColumn: ColumnSelectable = this.dimDraggable.selectedColumns.find(column => column.columnName === this._selectedColumnForFiltering)!;
    let type = selectedColumn.type.toLowerCase();
    if (type.includes('serial') || type.includes('int') || type.includes('num')) {
      return this.numberFilters;
    }
    return this.stringFilters;
  }

  onFilterButtonAddClick() {
    const filterExists: boolean = this.dimDraggable.columnFilters.some(filter =>
      filter.columnName === this._selectedColumnForFiltering
      && filter.operator === this._selectedFilter
      && filter.value === this._selectedFilterValue
    );
    if (filterExists) {
      this.messageService.add({
        severity: "warn",
        summary: "Warning",
        detail: "Filter already exists"
      });
      return;
    }
    this.dimDraggable.columnFilters.push(new ColumnFilter(
      this._selectedColumnForFiltering!,
      this._selectedFilter!,
      this._selectedFilterValue
    ));
    this._selectedColumnForFiltering = null;
    this._selectedFilter = null;
    this._selectedFilterValue = "";
  }

  onFilterRemove(index: number) {
    this.dimDraggable.columnFilters.splice(index, 1);
  }

  onColumnOptionChange(event: any) {
    this.dimDraggable.selectedColumns
      .filter(column => column.selected)
      .forEach(column => column.selected = false);
    this.dimDraggable.selectedColumns
      .filter(column => event.value.includes(column.columnName))
      .forEach(column => column.selected = true);
  }

  protected get selectionBadge(): string {
    return this.dimDraggable.selectedColumns
      .filter(column => column.selected)
      .length.toString();
  }

  protected get filtersBadge(): string {
    return this.dimDraggable.columnFilters
      .length.toString();
  }

}
