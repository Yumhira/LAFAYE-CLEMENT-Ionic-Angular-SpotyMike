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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AudioService } from './../../core/services/audio.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,

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
  private AudioService = inject(AudioService);
  constructor() {}

  onTabChange(event: any) {
    this.selectedTab = event.tab;
  }

  ngOnInit() {
    this.AudioService.load();
  }

  play() {

    this.AudioService.play();
  }

  pause() {
    this.AudioService.pause();
  }
}
