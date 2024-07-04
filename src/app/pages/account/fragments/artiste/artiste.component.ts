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
  IonTextarea
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ISong } from 'src/app/core/interfaces/song';
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
  ],
})
export class ArtisteComponent implements OnInit {
  private fireStoreService = inject(FirestoreService);

  isEditMode = false;
  artist: any[] = [];
  song: any[] = [];
  album: any[] = [];
  user: any[] = [];
  segmentArtist = 'Compte';

  form = new FormGroup({
    fullname: new FormControl(''),
    label: new FormControl(''),
    description: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {
    this.getArtistByFullname();
    this.getUserByEmail();
    this.getSongByArtist();
    this.getAlbumsByArtistId();
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

  getUserByEmail() {
    this.fireStoreService.getUserByEmail().then((data) => {
      this.user = data;
    });
  }

  async onClick(userId: string) {
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

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
