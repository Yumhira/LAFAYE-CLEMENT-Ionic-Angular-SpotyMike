import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCol, IonRow, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, ellipsisHorizontal } from 'ionicons/icons';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ModalController } from '@ionic/angular';
import { IPlaylist } from 'src/app/core/interfaces/playlist';
import { Router } from '@angular/router';
import { ShareComponent } from 'src/app/shared/modal/share/share.component';
import { ISong } from 'src/app/core/interfaces/song';

@Component({
  selector: 'app-like',
  templateUrl: './like.page.html',
  styleUrls: ['./like.page.scss'],
  standalone: true,
  imports: [IonItem, IonContent, IonHeader, IonIcon, IonButton, IonTitle, IonCol, IonRow, IonToolbar, CommonModule, FormsModule]
})
export class LikePage implements OnInit {
  private modalCtl = inject(ModalController);
  private fireStoreService = inject(FirestoreService);
  playlists: IPlaylist[] = [];
  songs: ISong[] = [];
  isPlaylistLiked: boolean = false;
  isSongLiked: boolean = false;

  constructor(private router: Router) {
    addIcons({ chevronBack, ellipsisHorizontal })
  }

  ngOnInit() {
    this.getPlaylistByLike();
    this.getSongByLike();
  }

  async getPlaylistByLike() {
    this.playlists = await this.fireStoreService.getPlaylistByLike();
    console.log(this.playlists);
  }

  async getSongByLike() {
    this.songs = await this.fireStoreService.getSongByLike();
    console.log(this.songs);
  }

  async onShareModal() {
    const modal = await this.modalCtl.create({
      component: ShareComponent,
      cssClass: 'share-modal',
    });
    return await modal.present();
  }

  async onLike(songId: string) {
    const song = this.songs.find(s => s.id === songId);
    if (song) {
      song.isLiked = !song.isLiked;
      try {
        await this.fireStoreService.updateSong(songId, { isLiked: song.isLiked });
        console.log('Successfully updated song in Firestore:', songId);
        location.reload();
      } catch (error) {
        console.error('Error updating document:', error);
        song.isLiked = !song.isLiked;
      }
    }
  }  

  goToPlayer() {
    this.router.navigate(['/player']);
  }

}
