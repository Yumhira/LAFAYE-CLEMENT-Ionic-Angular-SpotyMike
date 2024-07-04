import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonList,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  standalone: true,
  imports: [
  IonItem,
    IonContent,
    IonTitle,
    IonButton,
    IonButtons,
    IonList,
    IonLabel,
    IonIcon
  ],
})
export class ShareComponent implements OnInit {
  
  constructor(private modalController: ModalController) {
    addIcons({ closeOutline });
  }

  ngOnInit() {}

  backClicked() {
    this.modalController.dismiss();
  }

  shareFacebook() {
    window.location.href ='https://www.facebook.com/';
  }

  shareTwitter(){
    window.location.href = 'https://twitter.com/';
  }

  shareInstagram(){
    window.location.href = 'https://instagram.com/';
  }
}
