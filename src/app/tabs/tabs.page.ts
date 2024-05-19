import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import { heart } from 'ionicons/icons';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabButton,
  IonTabBar,
  IonIcon,
  IonImg,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
  ],
})
export class TabsPage implements OnInit {
  selectedTab: string = 'home';
  constructor() {
    addIcons({ home });
    addIcons({ heart });
  }

  ngOnInit() {}

  onTabChange(event: any) {
    this.selectedTab = event.tab;
  }
}
