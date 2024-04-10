import {Component, Input} from '@angular/core';
import {Metadata} from "@app/_models";
import {MatDialog} from "@angular/material/dialog";
import {MetadataService} from "@app/_services";
import {LoadPopupComponent} from "@app/etl/load/load-popup/load-popup.component";

@Component({
  selector: 'load-component',
  standalone: true,
  imports: [],
  templateUrl: './load.component.html',
  styleUrl: './load.component.css'
})
export class LoadComponent {

  @Input() extractedMetadata?: Metadata;

  datawarehouseMetadata?: Metadata;


  constructor(
    private dialog: MatDialog,
    private metadataService: MetadataService
  ) {
    this.metadataService.metadata
      .subscribe(metadata => this.datawarehouseMetadata = metadata);
  }

  loadPopup() {
    const dialogRef = this.dialog.open(LoadPopupComponent, {
      width: '900px',
      height: '500px',
      data: {databaseMetadata: this.extractedMetadata, datawarehouseMetadata: this.datawarehouseMetadata}
    });
  }

}
