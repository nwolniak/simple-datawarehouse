import {Component} from "@angular/core";
import {TabViewModule} from "primeng/tabview";
import {DialogModule} from "primeng/dialog";
import {ToolbarModule} from "primeng/toolbar";
import {TooltipModule} from "primeng/tooltip";
import {SelectComponent} from "@app/analytics/select/select.component";
import {GroupByComponent} from "@app/analytics/group-by/group-by.component";
import {OrderByComponent} from "@app/analytics/order-by/order-by.component";

@Component({
    selector: 'app-select-tab',
    standalone: true,
  imports: [
    TabViewModule,
    DialogModule,
    ToolbarModule,
    TooltipModule,
    SelectComponent,
    GroupByComponent,
    OrderByComponent
  ],
    templateUrl: './select-tab.component.html',
    styleUrl: './select-tab.component.css'
})
export class SelectTabComponent {

    visible: boolean = false;

    show() {
        this.visible = true;
    }

}
