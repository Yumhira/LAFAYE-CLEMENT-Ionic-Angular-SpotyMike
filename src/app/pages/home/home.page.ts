import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
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
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ISong } from 'src/app/core/interfaces/song';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { addSong, loadSong } from 'src/app/core/store/action/song.action';
import { selectStoreList } from 'src/app/core/store/selector/song.selector';

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
    AsyncPipe,
    ReactiveFormsModule,
  ],
})
export class HomePage {
  song$: Observable<ISong[]> = new Observable<ISong[]>();
  users: IUserTest[] = [];
  album: any[] = [];
  albumsong: any;
  artistsong: any[] = [];
  artist: any[] = [];
  playlist: any[] = [];
  user: any[] = [];
  lastAlbum: any[] = [];
  song: any[] = [];
  lastSongHeard: any[] = [];
  private userService = inject(UserService);
  private fireStoreService = inject(FirestoreService);
  private local = inject(LocalStorageService);
  store = inject(Store<AppState>);

  ngOnInit() {
    this.getAlbum();
    this.getUserByEmail();
    this.getPlaylist();
    this.getSongByNbEcoute();
    this.getLastAlbum();
    this.getArtistByNbLikes();
    this.getLastSongHeard();
    this.getArtistById('eiT0esFN8xYFDPNBwox1');
    this.store.dispatch(loadSong());
    const song: ISong = {
      id: 'oijvvoij',
      title: 'edzedzd',
      cover: '',
      artistId: [],
      albumId: [],
      genre: '',
      url: '',
      visibility: false
    };
    this.store.dispatch(addSong({ songs: [song, song] }));
    this.song$ = this.store.select(selectStoreList);
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

  goToMusicGenres() {
    this.router.navigate(['/listgenres']);
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
  }

  async getUserByEmail(){
    this.user = await this.fireStoreService.getUserByEmail();
  }

  async getPlaylist() {
    this.playlist = await this.fireStoreService.getPlaylist();
  }

  async getSongByNbEcoute() {
    this.song = await this.fireStoreService.getSongByNbEcoute();
  }

  async getLastAlbum() {
    this.lastAlbum = await this.fireStoreService.getLastAlbum();
  }

  async getArtistByNbLikes() {
    this.artist = await this.fireStoreService.getArtistByNbLikes();
  }

  async getLastSongHeard() {
    this.lastSongHeard = await this.fireStoreService.getLastSongHeard();
  }

  async getArtistById(artistId:string) {
    const artist = await this.fireStoreService.getArtistById(artistId);
    console.log(artist);
    return artist;
  }
}
