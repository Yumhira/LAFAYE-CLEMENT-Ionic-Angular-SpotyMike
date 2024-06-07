import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonRow,
  IonCol,
  IonCard
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, searchOutline, ellipsisHorizontal } from 'ionicons/icons';
import { IAlbum } from 'src/app/core/interfaces/album';
import { IUserTest } from 'src/app/core/interfaces/userTest';
import { PhoneNumberPipe } from 'src/app/core/pipe/phone-number.pipe';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PhoneNumberPipe,
    IonButton,
    IonButtons,
    IonRow,
    IonCol,
    IonCard,
  ],
})
export class HomePage {
  users: IUserTest[] = [];
  album: any[] = [];
  albumsong: any;
  artistsong: any[] = [];
  artist: any[] = [];
  playlist: any[] = [];
  user: any;
  lastAlbum: any[] = [];
  song: any[] = [];
  lastSongHeard: any[] = [];
  private userService = inject(UserService);
  private fireStoreService = inject(FirestoreService);
  private local = inject(LocalStorageService);

  ngOnInit() {
    // GET ALL USERS
    // const users: IUserTest[] = this.local.getElement('users');
    // if (!users)
    //   this.userService.requestTest().subscribe((response: IUserTest[]) => {
    //     this.users = response;
    //     this.local.setElement('users', JSON.stringify(this.users));
    //   });
    // else this.users = users;
    this.getAlbum();
    this.getUserByEmail();
    this.getSongByAlbum();
    this.getArtistBySong();
    this.getPlaylist();
    this.getSongByNbEcoute();
    this.getLastAlbum();
    this.getArtistByNbLikes();
    this.getLastSongHeard();
  }

  constructor(private router: Router) {
    addIcons({ arrowForwardOutline, searchOutline, ellipsisHorizontal });
  }

  goToPlayer() {
    this.router.navigate(['/player']);
  }

  goToMusicList() {
    this.router.navigate(['/listmusic']);
  }

  goToAlbum() {
    this.router.navigate(['/album']);
  }

  goToArtist() {
    this.router.navigate(['/artist']);
  }

  goToPlaylist() {
    this.router.navigate(['/tabs/playlist']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  async getAlbum() {
    this.album = await this.fireStoreService.getAlbum();
    console.log(this.album);
  }

  async getSongByAlbum() {
    this.albumsong = await this.fireStoreService.getSongByAlbum();
    console.log(this.albumsong);
  }

  async getArtistBySong() {
    this.artistsong = await this.fireStoreService.getArtistBySong();
    console.log(this.artistsong);
  }

  async getUserByEmail(){
    this.user = await this.fireStoreService.getUserByEmail();
    console.log(this.user);
  }

  async getPlaylist() {
    this.playlist = await this.fireStoreService.getPlaylist();
    console.log(this.playlist);
  }

  async getSongByNbEcoute() {
    this.song = await this.fireStoreService.getSongByNbEcoute();
    console.log(this.song);
  }

  async getLastAlbum(){
    this.lastAlbum = await this.fireStoreService.getLastAlbum();
    console.log(this.lastAlbum);
  }

  async getArtistByNbLikes() {
    this.artist = await this.fireStoreService.getArtistByNbLikes();
    console.log(this.artist);
  }

  async getLastSongHeard() {
    this.lastSongHeard = await this.fireStoreService.getLastSongHeard();
    console.log(this.lastSongHeard);
  }
}
