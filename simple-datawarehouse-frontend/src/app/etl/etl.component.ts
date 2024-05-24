import {Component} from '@angular/core';
import {Metadata} from "@app/_models";
import {environment} from "@environments/environment";
import {NgIf} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-etl',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './etl.component.html',
  styleUrl: './etl.component.css'
})
export class EtlComponent {

  metadata?: Metadata
  extractedMetadata?: Metadata
  nifiUrl: SafeResourceUrl


  constructor(private sanitizer: DomSanitizer) {
    this.nifiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.nifiUrl)
  }

  handleConnection(metadata: Metadata) {
    this.metadata = metadata;
  }

  handleExtraction(metadata: Metadata) {
    this.extractedMetadata = metadata;
  }

}
