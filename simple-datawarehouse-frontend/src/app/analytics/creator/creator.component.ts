import { Component } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FromComponent } from '@app/analytics/creator/from/from.component';
import { JoinAdvancedComponent } from '@app/analytics/creator/join/join-advanced/join-advanced.component';
import { JoinSimpleComponent } from '@app/analytics/creator/join/join-simple/join-simple.component';
import { SelectTabComponent } from '@app/analytics/creator/select/select-tab/select-tab.component';
import { SelectSimpleComponent } from '@app/analytics/creator/select/select-simple/select-simple.component';

@Component({
  selector: 'app-creator',
  standalone: true,
  templateUrl: './creator.component.html',
  imports: [
    ScrollPanelModule,
    FromComponent,
    JoinAdvancedComponent,
    JoinSimpleComponent,
    SelectTabComponent,
    SelectSimpleComponent,
  ],
  styleUrl: './creator.component.css',
})
export class CreatorComponent {}
