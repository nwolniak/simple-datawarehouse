import {Component} from '@angular/core';
import {MetadataService} from "@app/_services";
import {Metadata} from "@app/_models";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  metadata?: Metadata

  constructor(
    private metadataService: MetadataService) {
    this.metadataService.metadata.subscribe(metadata => this.metadata = metadata);
  }
}
