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
import { Subscription } from 'rxjs';

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

  private currentTimeSubscription!: Subscription;
  private durationSubscription!: Subscription;

  constructor() {}

  onTabChange(event: any) {
    this.selectedTab = event.tab;
  }

  ngOnInit() {
    if (!this.AudioService.audio.src) {
      this.AudioService.load();
    }

    this.currentTimeSubscription = this.AudioService.getCurrentTime().subscribe(
      (time) => {
        this.currentTime = this.formatTime(time);
        this.progress = (time / this.AudioService.audio.duration) * 100;
      }
    );

    this.durationSubscription = this.AudioService.getDuration().subscribe(
      (duration) => {
        this.duration = this.formatTime(duration);
      }
    );
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
    this.isPlaying = !this.isPlaying;
  }

  nextTrack() {
    this.AudioService.next();
  }

  previousTrack() {
    this.AudioService.previous();
  }

  seekTo(event: any) {
    const newValue = event.detail.value;
    const duration = this.AudioService.audio.duration;
    this.AudioService.audio.currentTime = (newValue / 100) * duration;
  }

  formatTime(secs: number) {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
