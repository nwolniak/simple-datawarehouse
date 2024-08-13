import {Component} from '@angular/core';
import {FromComponent} from "@app/analytics/from/from.component";
import {JoinComponent} from "@app/analytics/join/join.component";
import {SelectComponent} from "@app/analytics/select/select.component";
import {GroupByComponent} from "@app/analytics/group-by/group-by.component";
import {OrderByComponent} from "@app/analytics/order-by/order-by.component";
import {ScrollPanelModule} from "primeng/scrollpanel";

@Component({
  selector: 'app-creator',
  standalone: true,
  templateUrl: './creator.component.html',
  imports: [
    FromComponent,
    JoinComponent,
    SelectComponent,
    GroupByComponent,
    OrderByComponent,
    ScrollPanelModule
  ],
  styleUrl: './creator.component.css'
})
export class CreatorComponent {
}
