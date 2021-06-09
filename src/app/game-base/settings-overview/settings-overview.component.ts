import {Component} from '@angular/core';

@Component({
  selector: 'app-settings-overview',
  templateUrl: 'settings-overview.html',
  styleUrls: ['settings.component.scss']
})

export class SettingsOverviewComponent {

  setTheme(e) {
    if (e.target.checked) {
      localStorage.setItem("theme", "shiny")
    } else {
      localStorage.setItem("theme", "wooden")
    }
  }

  isShiny(): boolean {
    return localStorage.getItem('theme') == 'shiny'
  }
}
