import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { chevronBack, ellipsisHorizontal } from 'ionicons/icons';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ShareComponent } from 'src/app/shared/modal/share/share.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonIcon, IonButton, IonTitle, IonCol, IonRow, IonToolbar, CommonModule, FormsModule]
})
export class PlaylistPage implements OnInit {
  private modalCtl = inject(ModalController);
  private fireStoreService = inject(FirestoreService);
  playlist: any[] = [];
  isLiked: boolean = false;

  constructor(private _location: Location) {
    addIcons({ chevronBack, ellipsisHorizontal })
  }

  ngOnInit() {
    this.getPlaylist();
  }

  backClicked() {
    this._location.back();
  }

  async getPlaylist() {
    this.playlist = await this.fireStoreService.getPlaylist();
    console.log(this.playlist);
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
