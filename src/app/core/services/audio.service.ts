import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IPlaylistsMusic{
  audio: HTMLAudioElement;
  position: number;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio: HTMLAudioElement;
  private playlist$: BehaviorSubject<IPlaylistsMusic[]>;
  private isPlay$: BehaviorSubject<boolean>;
  private currentTrackIndex: number;

  constructor() {
    this.audio = new Audio();
    this.playlist$ = new BehaviorSubject<IPlaylistsMusic[]>([]);
    this.isPlay$ = new BehaviorSubject<boolean>(false);
    this.currentTrackIndex = 0;
  }

  load(id: string = '') {
    this.audio = new Audio('url/${id}');
    //this.audio = new Audio('assets/audio/testSong.mp3');
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

  }

  previous() {

  }

  loop() {
    this.audio.loop =!this.audio.loop;
  }

  shuffle() {

  }
}
