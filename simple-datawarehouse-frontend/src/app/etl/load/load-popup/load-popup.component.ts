import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {Metadata} from "@app/_models";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-load-popup',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatDialogContent
  ],
  templateUrl: './load-popup.component.html',
  styleUrl: './load-popup.component.css'
})
export class LoadPopupComponent {

  databaseMetadata: Metadata
  datawarehouseMetadata: Metadata


  constructor(
    private dialogRef: MatDialogRef<LoadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { databaseMetadata: Metadata, datawarehouseMetadata: Metadata }
  ) {
    this.databaseMetadata = data.databaseMetadata;
    this.datawarehouseMetadata = data.datawarehouseMetadata;
    console.log(this.databaseMetadata);
  }


  loadButton() {

  }
}
