import {Component} from '@angular/core';
import {AlertService} from '@app/_services';
import {HttpErrorResponse} from '@angular/common/http';
import {DataViewModule} from 'primeng/dataview';
import {Button, ButtonDirective} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {DatePipe, NgForOf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [
    DataViewModule,
    Button,
    DialogModule,
    TooltipModule,
    NgForOf,
    TableModule,
    ToolbarModule,
    ButtonDirective,
  ],
  templateUrl: './alert-list.component.html',
  styleUrl: './alert-list.component.css',
  providers: [DatePipe],
})
export class AlertListComponent {
  alerts: HttpErrorResponse[] = Array.of();
  alertsVisible: boolean = false;

  constructor(
    private alertService: AlertService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {
    this.alertService.alert.subscribe((alerts) => (this.alerts = alerts));
  }

  showAlerts() {
    if (this.alerts.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No alerts available.'
      });
      return;
    }
    this.alertsVisible = true;
  }

  removeAlert(index: number) {
    this.alertService.removeAlert(index);
  }

  clearAlerts() {
    this.alertService.clear();
  }

  timestampPipe(timestamp: string) {
    return this.datePipe.transform(timestamp, 'yyyy-MM-dd HH:mm:ss');
  }

  severity() {
    return this.alerts && this.alerts.length !== 0 ? 'danger' : 'primary';
  }

  badge() {
    return this.alerts ? this.alerts.length.toString() : '0';
  }
}
