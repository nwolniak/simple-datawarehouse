import {Component} from '@angular/core';
import {LoadComponent} from "@app/etl/load/load.component";
import {ConnectComponent} from "@app/etl/connect/connect.component";
import {TransformComponent} from "@app/etl/transform/transform.component";
import {ExtractComponent} from "@app/etl/extract/extract.component";
import {Metadata} from "@app/_models";

@Component({
  selector: 'app-etl',
  standalone: true,
  imports: [
    LoadComponent,
    ConnectComponent,
    TransformComponent,
    ExtractComponent
  ],
  templateUrl: './etl.component.html',
  styleUrl: './etl.component.css'
})
export class EtlComponent {

  metadata?: Metadata
  extractedMetadata?: Metadata

  handleConnection(metadata: Metadata) {
    this.metadata = metadata;
  }

  handleExtraction(metadata: Metadata) {
    this.extractedMetadata = metadata;
  }

}
