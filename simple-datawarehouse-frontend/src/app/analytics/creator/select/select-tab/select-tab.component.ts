import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { SelectAdvancedComponent } from '@app/analytics/creator/select/select-advanced/select-advanced.component';
import { GroupByComponent } from '@app/analytics/creator/select/select-advanced/group-by/group-by.component';
import { OrderByComponent } from '@app/analytics/creator/select/select-advanced/order-by/order-by.component';

@Component({
  selector: 'app-select-tab',
  standalone: true,
  imports: [
    TabViewModule,
    DialogModule,
    ToolbarModule,
    TooltipModule,
    SelectAdvancedComponent,
    GroupByComponent,
    OrderByComponent,
  ],
  templateUrl: './select-tab.component.html',
  styleUrl: './select-tab.component.css',
})
export class SelectTabComponent {
  visible: boolean = false;

  show() {
    this.visible = true;
  }
}
