import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConnectPopupComponent} from "@app/etl/connect/connect-popup/connect-popup.component";

@Component({
  selector: 'connect-component',
  standalone: true,
  imports: [],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {

  @Output()
  connectionEvent = new EventEmitter;

  constructor(private dialog: MatDialog) {
  }

  loadPopup() {
    const dialogRef = this.dialog.open(ConnectPopupComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(metadata => {
      if (metadata) {
        this.connectionEvent.emit(metadata);
      } else {
        console.log("Dialog closed without metadata");
      }
    });
  }

}
