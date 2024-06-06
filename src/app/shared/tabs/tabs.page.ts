import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { FirestoreService } from 'src/app/core/services/firestore.service';

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
  private userService = inject(FirestoreService);
  constructor() {
    console.log(this.userService.getUser());
  }

  ngOnInit() {}

  onTabChange(event: any) {
    this.selectedTab = event.tab;
  }
}
