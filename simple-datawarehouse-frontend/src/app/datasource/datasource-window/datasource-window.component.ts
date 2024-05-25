import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {DatasourceDialogComponent} from "@app/datasource/datasource-dialog/datasource-dialog.component";
import {MatButton} from "@angular/material/button";
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

  constructor(
    private dialog: MatDialog,
  ) {
  }

  openNewDataSourceDialog() {
    const dialogRef = this.dialog.open(DatasourceDialogComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(metadata => {
      if (!metadata) {
        console.log("Dialog closed without metadata");
      }
    });
  }
}
