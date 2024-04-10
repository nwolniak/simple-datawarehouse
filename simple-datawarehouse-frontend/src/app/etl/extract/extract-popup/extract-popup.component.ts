import {Component, Inject} from '@angular/core';
import {Metadata} from "@app/_models";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-extract-popup',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './extract-popup.component.html',
  styleUrl: './extract-popup.component.css'
})
export class ExtractPopupComponent {

  metadata: Metadata;

  constructor(
    private dialogRef: MatDialogRef<ExtractPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Metadata
  ) {
    this.metadata = data;
  }

  handleExtractButton() {
    this.metadata.tables.forEach(table => {
      table.columnsMetadata = table.columnsMetadata.filter(column => column.isChecked);
    });
    this.dialogRef.close(this.metadata);
  }
}
