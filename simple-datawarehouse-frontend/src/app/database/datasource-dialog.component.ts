import {Component} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MetadataService} from "@app/_services";
import {first} from "rxjs";

@Component({
  selector: 'app-datasource-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatButton,
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel
  ],
  templateUrl: './datasource-dialog.component.html',
  styleUrl: './datasource-dialog.component.css'
})
export class DatasourceDialogComponent {
  host?: string;
  database?: string;
  username?: string;
  password?: string;

  constructor(
    private dialogRef: MatDialogRef<DatasourceDialogComponent>,
    private metadataService: MetadataService
  ) {
  }

  createDataSource() {
    if (!this.host || !this.database || !this.username || !this.password) {
      console.log("All fields required")
      return;
    }

    this.metadataService.getMetadata()
      .pipe(first())
      .subscribe(metadata => {
        this.dialogRef.close(metadata);
      })
  }
}
