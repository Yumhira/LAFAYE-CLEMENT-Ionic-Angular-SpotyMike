import { Component, OnInit, inject } from '@angular/core';
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
import { Howl, Howler } from 'howler';

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
export class PlayerPage implements OnInit {
  public progress = 0;
  public currentTime = '0:00';
  public duration = '0:00';
  sound: Howl;
  isPlaying: boolean = false;
  isRepeating: boolean = false;

  constructor(private _location: Location) {
    addIcons({ chevronBack });
    addIcons({ ellipsisHorizontal });

    this.sound = new Howl({
      src: ['assets/audio/testSong.mp3'],
      onplay: () => {
        this.updateProgress();
        this.duration = this.formatTime(this.sound.duration());
      },
      onend: () => {
        if (this.isRepeating) {
          this.sound.play();
        } else {
          this.isPlaying = false;
          this.progress = 0;
          this.currentTime = '0:00';
        }
      },
    });
  }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.sound.pause();
    } else {
      this.sound.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  toggleRepeat() {
    this.isRepeating = !this.isRepeating;
  }

  updateProgress() {
    const seek = this.sound.seek() as number;
    const duration = this.sound.duration();

    this.progress = (seek / duration) * 100;
    this.currentTime = this.formatTime(seek);

    if (this.isPlaying) {
      requestAnimationFrame(() => this.updateProgress());
    }
  }

  seekTo(event: any) {
    const newValue = event.detail.value;
    const duration = this.sound.duration();
    this.sound.seek((newValue / 100) * duration);
    this.currentTime = this.formatTime(this.sound.seek() as number);
  }

  formatTime(secs: number) {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
