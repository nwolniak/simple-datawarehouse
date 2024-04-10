import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MetadataService} from "@app/_services";
import {ConnectionParameters} from "@app/_models";
import {first} from "rxjs";
import {DatasourceDialogComponent} from "@app/database-layout";

@Component({
  selector: 'app-connect-popup',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './connect-popup.component.html',
  styleUrl: './connect-popup.component.css'
})
export class ConnectPopupComponent {
  driverClassName: string;
  driver: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;

  constructor(
    private dialogRef: MatDialogRef<ConnectPopupComponent>,
    private metadataService: MetadataService
  ) {
    this.driverClassName = "org.postgresql.Driver";
    this.driver = "postgresql";
    this.host = "localhost";
    this.port = "5433";
    this.database = "database";
    this.username = "user";
    this.password = "password";
  }

  createDataSource() {
    const connectionParameters: ConnectionParameters = new ConnectionParameters(
      this.driverClassName,
      this.driver,
      this.host,
      this.port,
      this.database,
      this.username,
      this.password
    );
    this.metadataService.connectToDatabase(connectionParameters)
      .pipe(first())
      .subscribe(response => {
        this.metadataService.getDatabaseMetadata()
          .pipe(first())
          .subscribe(metadata => {
            this.dialogRef.close(metadata);
          })
      });
  }
}
