import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface IPlaylistsMusic {
  url: string;
  position: number;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public audio: HTMLAudioElement;
  private playlist$: BehaviorSubject<IPlaylistsMusic[]>;
  private isPlay$: BehaviorSubject<boolean>;
  private currentTrackIndex: number;
  private currentTime$: BehaviorSubject<number>;
  private duration$: BehaviorSubject<number>;

  constructor() {
    this.audio = new Audio();
    this.playlist$ = new BehaviorSubject<IPlaylistsMusic[]>([]);
    this.isPlay$ = new BehaviorSubject<boolean>(false);
    this.currentTrackIndex = 0;
    this.currentTime$ = new BehaviorSubject<number>(0);
    this.duration$ = new BehaviorSubject<number>(0);

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime$.next(this.audio.currentTime);
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration$.next(this.audio.duration);
    });

    this.setPlaylist([
      { url: 'assets/audio/testSong.mp3', position: 0, status: false },
      { url: 'assets/audio/testSong2.mp3', position: 1, status: false },
      { url: 'assets/audio/testSong3.mp3', position: 2, status: false },
    ]);
  }

  private setPlaylist(playlist: IPlaylistsMusic[]) {
    this.playlist$.next(playlist);
  }

  load(id: string = '') {
    if (id) {
      this.audio.src = `url/${id}`;
    } else {
      this.loadCurrentTrack();
    }
    this.audio.load();
  }

  play() {
    this.audio.play();
    this.isPlay$.next(true);
  }

  pause() {
    this.audio.pause();
    this.isPlay$.next(false);
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlay$.next(false);
  }

  next() {
    if (this.currentTrackIndex < this.playlist$.value.length - 1) {
      this.currentTrackIndex++;
    } else {
      this.currentTrackIndex = 0;
    }
    this.loadCurrentTrack();
    this.play();
    console.log(`Next track: ${this.currentTrackIndex}`);
  }

  previous() {
    if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
    } else {
      this.currentTrackIndex = this.playlist$.value.length - 1;
    }
    this.loadCurrentTrack();
    this.play();
    console.log(`Previous track: ${this.currentTrackIndex}`);
  }

  loop() {
    this.audio.loop = !this.audio.loop;
  }

  shuffle() {
    const shuffledPlaylist = this.shuffleArray([...this.playlist$.value]);
    this.playlist$.next(shuffledPlaylist);
    this.currentTrackIndex = 0;
    this.loadCurrentTrack();
    console.log(`Shuffled playlist: ${JSON.stringify(shuffledPlaylist)}`);
  }

  private shuffleArray(array: IPlaylistsMusic[]): IPlaylistsMusic[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private loadCurrentTrack() {
    const currentTrack = this.playlist$.value[this.currentTrackIndex];
    if (currentTrack) {
      this.audio.src = currentTrack.url;
      this.audio.load();
    }
    console.log(`Loaded track: ${this.audio.src}`);
  }

  getCurrentTime(): Observable<number> {
    return this.currentTime$.asObservable();
  }

  getDuration(): Observable<number> {
    return this.duration$.asObservable();
  }
}
