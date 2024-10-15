import { Component, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConnectionService, MetadataService } from '@app/_services';
import { first } from 'rxjs';
import { ConnectionParameters } from '@app/_models';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import {environment} from "@environments/environment";

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
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './datasource-parameters.component.html',
  styleUrl: './datasource-parameters.component.css',
})
export class DatasourceParametersComponent implements OnInit {
  parametersForm: FormGroup;

  createButtonDisabled: boolean = true;
  createButtonLoading: boolean = false;
  createButtonColor: string = 'primary';

  constructor(
    private dialogRef: MatDialogRef<DatasourceParametersComponent>,
    private fb: FormBuilder,
    private connectionService: ConnectionService,
    private metadataService: MetadataService,
  ) {
    this.parametersForm = this.fb.group({
      driverClassName: [`${environment.driverClassName}`, Validators.required],
      driver: [`${environment.driver}`, Validators.required],
      host: [`${environment.host}`, Validators.required],
      port: [`${environment.port}`, [Validators.required, Validators.pattern('^[0-9]+$')]],
      database: [`${environment.database}`, Validators.required],
      username: [`${environment.username}`, Validators.required],
      password: [`${environment.password}`, Validators.required],
    });
  }

  ngOnInit(): void {
    this.createButtonDisabled = this.parametersForm.status !== 'VALID';
    this.createButtonColor =
      this.parametersForm.status === 'VALID' ? 'primary' : 'warn';
    this.parametersForm.statusChanges.subscribe((status: string) => {
      this.createButtonDisabled = status !== 'VALID';
      if (status == 'VALID') {
        this.createButtonColor = 'primary';
      }
    });
  }

  createDataSource() {
    if (!this.parametersForm.valid) {
      return;
    }
    this.createButtonLoading = true;
    const connectionParameters: ConnectionParameters = new ConnectionParameters(
      this.parametersForm.value.driverClassName,
      this.parametersForm.value.driver,
      this.parametersForm.value.host,
      this.parametersForm.value.port,
      this.parametersForm.value.database,
      this.parametersForm.value.username,
      this.parametersForm.value.password,
    );
    this.connectionService.connectToDatabase(connectionParameters).subscribe({
      next: (_) => {
        this.createButtonColor = 'primary';
        this.metadataService
          .getDatawarehouseMetadata()
          .pipe(first())
          .subscribe((metadata) => {
            this.dialogRef.close(metadata);
          });
      },
      error: (err) => {
        this.createButtonColor = 'warn';
        this.createButtonLoading = false;
        console.error(err);
      },
    });
  }
}
