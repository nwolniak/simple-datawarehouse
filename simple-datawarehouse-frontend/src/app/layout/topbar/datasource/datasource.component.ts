import {Component, OnInit} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ConnectionService, MetadataService} from "@app/_services";
import {environment} from "@environments/environment";
import {ConnectionParameters, Metadata} from "@app/_models";
import {catchError, first, of, switchMap, tap} from "rxjs";
import {Severities, Severity} from "@app/_utils";

@Component({
  selector: 'datasource-component',
  standalone: true,
  imports: [
    ToolbarModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    Button
  ],
  templateUrl: './datasource.component.html',
  styleUrl: './datasource.component.css'
})
export class DatasourceComponent implements OnInit {
  parametersForm: FormGroup;
  dialogVisible: boolean = false;
  createButtonDisabled: boolean = false;
  createButtonLoading: boolean = false;
  createButtonSeverity: Severity = Severities.Primary;

  constructor(
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
    this.createButtonSeverity = this.parametersForm.status === 'VALID' ? Severities.Primary : Severities.Danger;
    this.parametersForm.statusChanges.subscribe((status: string) => {
      this.createButtonDisabled = status !== 'VALID';
      if (status == 'VALID') {
        this.createButtonSeverity = Severities.Primary;
      }
    });
  }

  openDialog() {
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
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
    this.connectionService.connectToDatabase(connectionParameters).pipe(
      switchMap(() => this.metadataService.requestDatawarehouseMetadata().pipe(first())),
      tap((metadata: Metadata) => {
        this.createButtonSeverity = Severities.Primary;
        this.dialogVisible = false;
      }),
      catchError((err) => {
        this.createButtonSeverity = Severities.Danger;
        return of(null);
      })
    ).subscribe({
      next: () => {
        this.createButtonLoading = false;
        this.createButtonDisabled = false;
      }
    });
  }
}
