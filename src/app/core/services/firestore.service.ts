import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, limit } from 'firebase/firestore/lite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  // GET ALBUMS
  async getAlbums(){
    const albumsCol = collection(this.db, 'albums');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map(doc => doc.data());
    console.log(albumsList);
    return albumsList; 
  }

  // GET ALBUM BY ARTIST NAME
  async getAlbums2(){
    const albumsCol = collection(this.db, 'albums');
    const q = query(albumsCol, where('artist.name', '==', "Mike"), limit(3));
    const albumsSnapshot = await getDocs(q);
    const albumsList = albumsSnapshot.docs.map(doc => doc.data());
    console.log(albumsList);
    return albumsList; 
  }

  // GET ALBUM BY SONG TITLE
  async getAlbumBySongTitle(){
    const albumsCol = collection(this.db, 'albums');
    const q = query(albumsCol, where('songs.1.title', '==', 'Baby Shark'), limit(3));
    const albumsSnapshot = await getDocs(q);
    const albumsList = albumsSnapshot.docs.map(doc => doc.data());
    console.log(albumsList);
    return albumsList; 
  }

  // GET ALBUM BY SONGS
  async getAlbumBySongs(){
    const albumsCol = collection(this.db, 'albums.songs');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map(doc => doc.data());
    console.log(albumsList);
    return albumsList; 
  }

  constructor() { }
}
