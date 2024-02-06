import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {DatasourceDialogComponent} from "@app/database/datasource-dialog.component";
import {MatButton} from "@angular/material/button";
import {Metadata} from "@app/_models";
import {DatabaseListComponent} from "@app/database/database.list.component";

@Component({
  selector: 'app-database.window',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    DatabaseListComponent,
  ],
  templateUrl: './database.window.component.html',
  styleUrl: './database.window.component.css'
})
export class DatabaseWindowComponent {

  metadata?: Metadata;

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
    })

  }
}
