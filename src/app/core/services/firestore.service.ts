import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, limit, doc, getDoc, DocumentReference, orderBy } from 'firebase/firestore/lite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  // GET ALBUMS
  async getAlbums() {
    const albumsCol = collection(this.db, 'albums');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    console.log(albumsList);
    return albumsList;
  }

  // GET ALBUM BY ARTIST NAME
  async getAlbums2() {
    const albumsCol = collection(this.db, 'albums');
    const q = query(albumsCol, where('artist.name', '==', 'Mike'), limit(3));
    const albumsSnapshot = await getDocs(q);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    console.log(albumsList);
    return albumsList;
  }

  //get user by email
  async getUserByEmail() {
    const usersCol = collection(this.db, 'user');
    const q = query(
      usersCol,
      where('email', '==', 'utilisateurRandom@gmail.com')
    );
    const usersSnapshot = await getDocs(q);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    console.log(usersList);
    return usersList;
  }

  // GET ALBUM BY SONG TITLE
  async getAlbumBySongTitle() {
    const albumsCol = collection(this.db, 'albums');
    const q = query(
      albumsCol,
      where('songs.1.title', '==', 'Baby Shark'),
      limit(3)
    );
    const albumsSnapshot = await getDocs(q);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    console.log(albumsList);
    return albumsList;
  }

  // GET ALBUM BY SONGS
  async getAlbumBySongs() {
    const albumsCol = collection(this.db, 'albums.songs');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    console.log(albumsList);
    return albumsList;
  }

  //get user
  async getUser() {
    const usersCol = collection(this.db, 'user');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    console.log(usersList);
    return usersList;
  }

  //get artist
  async getArtist() {
    const artistCol = collection(this.db, 'artist');
    const artistSnapshot = await getDocs(artistCol);
    const artistList = artistSnapshot.docs.map((doc) => doc.data());
    console.log(artistList);
    return artistList;
  }

  //get playlist
  async getPlaylist() {
    const playlistCol = collection(this.db, 'playlist');
    const playlistSnapshot = await getDocs(playlistCol);
    const playlistList = playlistSnapshot.docs.map((doc) => doc.data());
    console.log(playlistList);
    return playlistList;
  }

  //get album
  async getAlbum() {
    const albumCol = collection(this.db, 'album');
    const albumSnapshot = await getDocs(albumCol);
    const albumList = albumSnapshot.docs.map((doc) => doc.data());
    console.log(albumList);
    return albumList;
  }

  //get song
  async getSong() {
    const songCol = collection(this.db, 'song');
    const songSnapshot = await getDocs(songCol);
    const songList = songSnapshot.docs.map((doc) => doc.data());
    console.log(songList);
    return songList;
  }

  async getSongByNbEcoute() {
    const songCol = collection(this.db, 'song');
    const q = query(
      songCol,
      orderBy('nbEcoutes', 'desc'),
      limit(3)
    );
    const songSnapshot = await getDocs(q);
    const songList = songSnapshot.docs.map((doc) => doc.data());
    console.log(songList);
    return songList;
  }

  constructor() {}
}
