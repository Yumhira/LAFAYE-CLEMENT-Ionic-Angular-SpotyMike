import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonIcon, IonTabBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonTabBar, IonIcon, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
