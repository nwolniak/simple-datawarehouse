import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MetadataService } from '@app/_services';
import { first } from 'rxjs';
import { ConnectionParameters } from '@app/_models';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datasource-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatLabel,
    MatFormField,
    MatDialogTitle,
    MatInput,
    MatButton,
    MatDialogClose,
    FormsModule,
    MatDialogActions,
  ],
  templateUrl: './datasource-parameters.component.html',
  styleUrl: './datasource-parameters.component.css',
})
export class DatasourceParametersComponent {
  driverClassName: string;
  driver: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;

  constructor(
    private dialogRef: MatDialogRef<DatasourceParametersComponent>,
    private metadataService: MetadataService,
  ) {
    this.driverClassName = 'org.postgresql.Driver';
    this.driver = 'postgresql';
    this.host = 'localhost';
    this.port = '5432';
    this.database = 'simple_datawarehouse';
    this.username = 'user';
    this.password = 'password';
  }

  createDataSource() {
    const connectionParameters: ConnectionParameters = new ConnectionParameters(
      this.driverClassName,
      this.driver,
      this.host,
      this.port,
      this.database,
      this.username,
      this.password,
    );
    this.metadataService
      .connectToDatabase(connectionParameters)
      .pipe(first())
      .subscribe((response) => {
        this.metadataService
          .getDatawarehouseMetadata()
          .pipe(first())
          .subscribe((metadata) => {
            this.dialogRef.close(metadata);
          });
      });
  }
}
