import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonIcon, IonButton, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { chevronBack, ellipsisHorizontal } from 'ionicons/icons';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ShareComponent } from 'src/app/shared/modal/share/share.component';
import { IPlaylist } from 'src/app/core/interfaces/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
  standalone: true,
  imports: [IonItem, IonContent, IonHeader, IonIcon, IonButton, IonTitle, IonCol, IonRow, IonToolbar, CommonModule, FormsModule]
})
export class PlaylistPage implements OnInit {
  private modalCtl = inject(ModalController);
  private fireStoreService = inject(FirestoreService);
  playlists: IPlaylist[] = [];
  isLiked: boolean = false;

  constructor(private router: Router) {
    addIcons({ chevronBack, ellipsisHorizontal })
  }

  ngOnInit() {
    this.getPlaylist();
  }

  async getPlaylist() {
    this.playlists = await this.fireStoreService.getPlaylist();
    console.log(this.playlists);
  }

  async onShareModal() {
    const modal = await this.modalCtl.create({
      component: ShareComponent,
      cssClass: 'share-modal',
    });
    return await modal.present();
  }

  async onLike(playlistId: string) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.isLiked = !playlist.isLiked;
      try {
        await this.fireStoreService.updatePlaylist(playlistId, { isLiked: playlist.isLiked });
        console.log('Successfully updated playlist in Firestore:', playlistId);
      } catch (error) {
        console.error('Error updating document:', error);
        playlist.isLiked = !playlist.isLiked;
      }
    }
  }  

  goToPlayer() {
    this.router.navigate(['/player']);
  }

}
