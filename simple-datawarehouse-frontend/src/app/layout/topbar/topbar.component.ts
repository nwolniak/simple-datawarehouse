import {Component} from '@angular/core';
import {DatasourceComponent} from '@app/layout/topbar/datasource/datasource.component';
import {ToolbarModule} from "primeng/toolbar";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [DatasourceComponent, ToolbarModule, Button, ButtonDirective, Ripple],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {

  protected darkIcon: string = 'pi pi-moon';
  protected lightIcon: string = 'pi pi-sun';

  isLightTheme: boolean = true;
  icon: string = this.darkIcon;

  toggleTheme() {
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    if (this.isLightTheme) {
      themeLink.href = `assets/themes/lara-dark-blue/theme.css`;
      this.isLightTheme = false;
      this.icon = this.lightIcon;
    } else {
      themeLink.href = `assets/themes/lara-light-blue/theme.css`;
      this.isLightTheme = true;
      this.icon = this.darkIcon;
    }
  }

}
