import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsSubject: BehaviorSubject<HttpErrorResponse[]> = new BehaviorSubject<HttpErrorResponse[]>(Array.of());
  alerts$: Observable<HttpErrorResponse[]> = this.alertsSubject.asObservable();

  constructor() {}

  addAlert(alert: HttpErrorResponse) {
    const alerts = this.alertsSubject.getValue();
    this.alertsSubject.next([alert, ...alerts]);
  }

  removeAlert(index: number) {
    const alerts = this.alertsSubject.getValue();
    alerts.splice(index, 1);
    this.alertsSubject.next([...alerts]);
  }

  clear() {
    this.alertsSubject.next([]);
  }
}
