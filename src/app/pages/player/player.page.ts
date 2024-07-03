import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonImg,
  IonCol,
  IonRange,
  IonProgressBar,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBack, ellipsisHorizontal } from 'ionicons/icons';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ShareComponent } from 'src/app/shared/modal/share/share.component';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AudioService } from 'src/app/core/services/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonLabel,
    IonProgressBar,
    IonRange,
    IonCol,
    IonImg,
    IonRow,
    IonGrid,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class PlayerPage implements OnInit, OnDestroy {
  public progress = 0;
  public currentTime = '0:00';
  public duration = '0:00';
  private fireStoreService = inject(FirestoreService);
  song: any[] = [];
  isPlaying: boolean = false;
  isRepeating: boolean = false;
  isShuffling: boolean = false;
  isLiked: boolean = false;
  currentTrackIndex: number = 0;
  showLyrics = false;

  private modalCtl = inject(ModalController);
  private AudioService = inject(AudioService);

  private currentTimeSubscription!: Subscription;
  private durationSubscription!: Subscription;

  constructor(private _location: Location) {
    addIcons({ chevronBack });
    addIcons({ ellipsisHorizontal });
  }

  ngOnInit() {
    this.getSongByTitle();
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

  ngOnDestroy() {
    if (this.currentTimeSubscription) {
      this.currentTimeSubscription.unsubscribe();
    }
    if (this.durationSubscription) {
      this.durationSubscription.unsubscribe();
    }
  }

  backClicked() {
    this._location.back();
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

  async getSongByTitle() {
    this.song = await this.fireStoreService.getSongByTitle();
    console.log(this.song);
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

  toggleLyrics() {
    this.showLyrics = !this.showLyrics;
  }

  async onShareModal() {
    const modal = await this.modalCtl.create({
      component: ShareComponent,
      cssClass: 'share-modal',
    });
    return await modal.present();
  }

  onLike() {
    this.isLiked = !this.isLiked;
  }
}
