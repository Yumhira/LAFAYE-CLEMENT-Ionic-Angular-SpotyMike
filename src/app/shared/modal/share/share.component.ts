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
} from '@ionic/angular/standalone';

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
  ],
})
export class ShareComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
}
