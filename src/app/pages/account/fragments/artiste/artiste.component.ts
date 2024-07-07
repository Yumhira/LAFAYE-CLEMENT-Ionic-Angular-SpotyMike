import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonTabButton,
  IonItem,
  IonLabel,
  IonButton,
  IonSegmentButton,
  IonSegment,
  IonTextarea,
  IonIcon
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ISong } from 'src/app/core/interfaces/song';
import { addIcons } from 'ionicons';
import { eyeOff, eye } from 'ionicons/icons';
import { IArtist } from 'src/app/core/interfaces/artist';
import { IAlbum } from 'src/app/core/interfaces/album';
import { IUser } from 'src/app/core/interfaces/user';
import { CreateSongPage } from 'src/app/shared/modal/createsong/createsong.page';
import { CreateAlbumPage } from 'src/app/shared/modal/createalbum/createalbum.page';
@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrls: ['./artiste.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonSegment,
    IonSegmentButton,
    IonButton,
    IonLabel,
    IonItem,
    IonTabButton,
    IonInput,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    ReactiveFormsModule,
    IonTextarea,
    IonIcon
  ],
})
export class ArtisteComponent implements OnInit {
  private fireStoreService = inject(FirestoreService);
  private modalCtl = inject(ModalController);

  isEditMode = false;
  artist: any[] = [];
  song: ISong[] = [];
  album: IAlbum[] = [];
  user: IUser[] = [];
  segmentArtist = 'Compte';

  form = new FormGroup({
    fullname: new FormControl(''),
    label: new FormControl(''),
    description: new FormControl(''),
  });

  constructor() {
    addIcons({eye, eyeOff})
  }

  ngOnInit() {
    this.getArtistByFullname();
    this.getUserByEmail();
    this.getSongByArtist();
    this.getAlbumsByArtistId();
  }

  getUserByEmail() {
    this.fireStoreService.getUserByEmail().then((data) => {
      this.user = data;
    });
  }

  async getArtistByFullname() {
    this.artist = await this.fireStoreService.getArtistByFullname();
  }

  async getAlbumsByArtistId() {
    this.album = await this.fireStoreService.getAlbumsByArtistId();
  }

  async getSongByArtist() {
    this.song = await this.fireStoreService.getSongByArtist();
  }

  async onClick(userId: string) {
    this.isEditMode = false;
    const user = this.user.find(p => p.id === userId);
    if (user) {
      user.isArtist = !user.isArtist;
      try {
        await this.fireStoreService.updateUser(userId, { isArtist: user.isArtist });
        console.log('Successfully updated user in Firestore:', userId);
        location.reload();
      } catch (error) {
        console.error('Error updating document:', error);
        user.isArtist = !user.isArtist;
      }
    }
  }

  async onClickVisibility(songId: string) {
    const song = this.song.find(p => p.id === songId);
    if (song) {
      song.visibility = !song.visibility;
      try {
        await this.fireStoreService.updateSong(songId, { visibility: song.visibility });
        console.log('Successfully updated song in Firestore:', songId);
      } catch (error) {
        console.error('Error updating document:', error);
        song.visibility = !song.visibility;
      }
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  async onAddSongModal() {
    const modal = await this.modalCtl.create({
      component: CreateSongPage,
    });
    modal.present();
  }

  async onAddAlbumModal() {
    const modal = await this.modalCtl.create({
      component: CreateAlbumPage,
    });
    modal.present();
  }
}
