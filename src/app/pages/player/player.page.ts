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

  constructor(private _location: Location) {
    addIcons({ chevronBack });
    addIcons({ ellipsisHorizontal });

    setInterval(() => {
      this.progress += 1;
    }, 50);
  }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }
}
