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
  IonRange,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AudioService } from './../../core/services/audio.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonButton,
    IonRange,
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

  isPlaying: boolean = false;
  isRepeating: boolean = false;
  isShuffling: boolean = false;

  public progress = 0;
  public currentTime = '0:00';
  public duration = '0:00';

  constructor() {}

  onTabChange(event: any) {
    this.selectedTab = event.tab;
  }

  ngOnInit() {
    this.AudioService.load();
  }

  toggleRepeat() {
    this.isRepeating = !this.isRepeating;
    this.AudioService.loop();
  }

  toggleShuffle() {
    this.isShuffling = !this.isShuffling;
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.AudioService.pause();
    } else {
      this.AudioService.play();
    }
    this.isPlaying =!this.isPlaying;
  }
}
