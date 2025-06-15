import {Component} from '@angular/core';
import {environment} from '@environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-etl',
  standalone: true,
  imports: [],
  templateUrl: './etl.component.html',
  styleUrl: './etl.component.css',
})
export class EtlComponent {
  nifiUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.nifiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.nifiUrl,
    );
  }
}
