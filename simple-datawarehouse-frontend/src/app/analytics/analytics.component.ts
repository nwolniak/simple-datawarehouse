import {Component} from '@angular/core';
import {TableModule} from "primeng/table";
import {NgForOf, NgIf} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {Ripple} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";
import {CreatorComponent} from "@app/analytics/creator/creator.component";
import {ResultTableComponent} from "@app/analytics/result-table/result-table.component";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    NgForOf,
    Button,
    MultiSelectModule,
    PaginatorModule,
    Ripple,
    ButtonDirective,
    TooltipModule,
    CreatorComponent,
    ResultTableComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
}
