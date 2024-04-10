import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ExtractPopupComponent} from "@app/etl/extract/extract-popup/extract-popup.component";
import {Metadata} from "@app/_models";

@Component({
  selector: 'extract-component',
  standalone: true,
  imports: [],
  templateUrl: './extract.component.html',
  styleUrl: './extract.component.css'
})
export class ExtractComponent {

  @Input()
  metadata?: Metadata;

  @Output()
  extractionEvent = new EventEmitter;

  constructor(
    private dialog: MatDialog
  ) {
  }

  loadPopup() {
    const dialogRef = this.dialog.open(ExtractPopupComponent, {
      width: '400px',
      data: this.metadata
    });

    dialogRef.afterClosed().subscribe(metadata => {
      if (metadata) {
        this.extractionEvent.emit(metadata);
      } else {
        console.log("Dialog closed without metadata");
      }
    });
  }


}
