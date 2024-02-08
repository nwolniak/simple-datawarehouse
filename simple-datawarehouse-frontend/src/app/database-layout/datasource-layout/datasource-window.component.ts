import {Component, EventEmitter, Output} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {DatasourceDialogComponent} from "@app/database-layout/datasource-layout/datasource-dialog.component";
import {MatButton} from "@angular/material/button";
import {Metadata} from "@app/_models";
import {DatasourceListComponent} from "@app/database-layout/datasource-layout/datasource-list.component";

@Component({
  selector: 'app-datasource-window',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    DatasourceListComponent,
  ],
  templateUrl: './datasource-window.component.html',
  styleUrl: './datasource-window.component.css'
})
export class DatasourceWindowComponent {

  metadata?: Metadata;

  @Output()
  tableChosenEvent = new EventEmitter;

  constructor(
    private dialog: MatDialog,
  ) {
  }

  openNewDataSourceDialog() {
    const dialogRef = this.dialog.open(DatasourceDialogComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(metadata => {
      if (metadata) {
        this.metadata = metadata;
      } else {
        console.log("Dialog closed without metadata");
      }
    });
  }

  emitTableChosenEvent(table: string) {
    this.tableChosenEvent.emit(table);
  }

}
