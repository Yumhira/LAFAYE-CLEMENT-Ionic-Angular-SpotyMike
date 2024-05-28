import { Component, OnInit, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonIcon, IonTabBar } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonTabBar, IonIcon, IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private translate = inject(TranslateService);
  constructor() {}

  ngOnInit(): void {
    this.translate.use('fr_FR');
    this.translate.setDefaultLang('fr_FR');
  }
}
