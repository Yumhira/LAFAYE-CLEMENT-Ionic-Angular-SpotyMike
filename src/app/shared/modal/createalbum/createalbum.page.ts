import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonIcon } from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-createalbum',
  templateUrl: './createalbum.page.html',
  styleUrls: ['./createalbum.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonIcon]
})
export class CreateAlbumPage implements OnInit {
  private modalCtl = inject(ModalController);

  constructor() {
    addIcons({ chevronBack }) 
  }

  ngOnInit() {
  }

  async backClicked() {
    await this.modalCtl.dismiss();
  }

}
