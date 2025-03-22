import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {DatasourceParametersComponent} from "@app/layout/topbar/datasource-parameters/datasource-parameters.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-datasource-window',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton
  ],
  templateUrl: './datasource.component.html',
  styleUrl: './datasource.component.css'
})
export class DatasourceComponent {

  constructor(private dialog: MatDialog) {
  }

  openDataSourceDialog() {
    const dialogRef = this.dialog.open(DatasourceParametersComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(metadata => {
      if (!metadata) {
        console.log("Dialog closed without metadata");
      }
    });
  }
}
