import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, documentId ,query, where, limit, doc, getDoc, DocumentReference, orderBy, updateDoc } from 'firebase/firestore/lite';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISong } from 'src/app/core/interfaces/song'
import { IArtist } from '../interfaces/artist';
import { IPlaylist } from '../interfaces/playlist';
import { IUser } from '../interfaces/user';
import { IAlbum } from '../interfaces/album';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  // GET ALBUMS
  async getAlbums() {
    const albumsCol = collection(this.db, 'album');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getAlbums : ", albumsList);
    return albumsList;
  }

  // GET ALBUM BY ARTIST ID
  async getAlbumsByArtistId(artistId = "eiT0esFN8xYFDPNBwox1"): Promise<IAlbum[]> {
    const albumsCol = collection(this.db, 'album');
    const q = query(albumsCol, where('artistId', '==', artistId));
    const albumsSnapshot = await getDocs(q);
    return albumsSnapshot.docs.map(doc => doc.data() as IAlbum);
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
    console.log("Voici le getUserByEmail : ", usersList);
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
    console.log("Voici le getAlbumBySongTitle : ", albumsList);
    return albumsList;
  }

  // GET ALBUM BY SONGS
  async getAlbumBySongs() {
    const albumsCol = collection(this.db, 'albums.songs');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getAlbumBySongs : ", albumsList);
    return albumsList;
  }

  //get user
  async getUser(): Promise<IUser[]> {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'user'));
      return querySnapshot.docs.map(doc => {
        const data = doc.data() as IUser;
        const id = doc.id;
        return { ...data, id };
      });
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }

  //get user by id
  async getUserById(userId: string) {
    const userCol = collection(this.db, 'user');
    const q = query(
      userCol,
      where(documentId(), '==', userId)
    );
    const userSnapshot = await getDocs(q);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getUserById : ", userList);
    return userList;
  }

  async updateUser(userId: string, data: Partial<IUser>) {
    const userDoc = doc(this.db, 'user', userId);
    await updateDoc(userDoc, data);
  }

  //get artist
  async getArtist() {
    const artistCol = collection(this.db, 'artist');
    const artistSnapshot = await getDocs(artistCol);
    const artistList = artistSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getArtist : ", artistList);
    return artistList;
  }

  //get playlist
  async getPlaylist(): Promise<IPlaylist[]> {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'playlist'));
      return querySnapshot.docs.map(doc => {
        const data = doc.data() as IPlaylist;
        const id = doc.id;
        return { ...data, id };
      });
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return []; // Return empty array or handle error appropriately
    }
  }

  //get playlist by id
  async getPlaylistById(playlistId: string) {
    const playlistCol = collection(this.db, 'playlist');
    const q = query(
      playlistCol,
      where(documentId(), '==', playlistId)
    );
    const playlistSnapshot = await getDocs(q);
    const playlistList = playlistSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getPlaylistById : ", playlistList);
    return playlistList;
  }

  async updatePlaylist(playlistId: string, data: Partial<IPlaylist>) {
    const playlistDoc = doc(this.db, 'playlist', playlistId);
    await updateDoc(playlistDoc, data);
  }

  //get album
  async getAlbum() {
    const albumCol = collection(this.db, 'album');
    const albumSnapshot = await getDocs(albumCol);
    const albumList = albumSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getAlbum : ", albumList);
    return albumList;
  }

  //get song by album
  async getSongByAlbum() {
    const albumCol = collection(this.db, 'album');
    const albumSnapshot = await getDocs(albumCol);
    const albumList: any[] = albumSnapshot.docs.map((doc) => doc.data());
    let songList: any[] = [];

    if (albumList[1]?.songs) {
      for (let song of albumList[1].songs) {
        const songSnapshot = await getDocs(song);
        const songs = songSnapshot.docs.map((doc) => doc.data());
        songList = songs;
      }
    }

    console.log("Voici le getSongByAlbum : ", songList);
    return songList;
  }

  //get artist by song
  async getArtistBySong() {
    const songCol = collection(this.db, 'song');
    const songSnapshot = await getDocs(songCol);
    const songList: any[] = songSnapshot.docs.map((doc) => doc.data());

    let artistList: any[] = [];
    if (songList[2]?.artistId) {
      for (let artist of songList[2].artistId) {
        const artistSnapshot = await getDocs(artist);
        const artists = artistSnapshot.docs.map((doc) => doc.data());
        artistList = artists;
      }
    }
    console.log("Voici le getArtistBySong : ", artistList);
    return artistList;
  }

  //get song
  async getSong() {
    const songCol = collection(this.db, 'song');
    const songSnapshot = await getDocs(songCol);
    const songList = songSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getSong : ", songList);
    return songList;
  }

  // GET SONG BY TITLE
  async getSongByTitle() {
    const songsCol = collection(this.db, 'song');
    const q = query(songsCol, where('title', '==', 'Ipséité'));
    const albumsSnapshot = await getDocs(q);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getSongByTitle : ", albumsList);
    return albumsList;
  }

  // GET SONG BY ARTIST
  async getSongByArtist(artistId = "eiT0esFN8xYFDPNBwox1"): Promise<ISong[]> {
    const songsCol = collection(this.db, 'song');
    const q = query(songsCol, where('artistId', '==', artistId));
    const songsSnapshot = await getDocs(q);
    return songsSnapshot.docs.map(doc => doc.data() as ISong);
  }

  async getSongByNbEcoute() {
    const songCol = collection(this.db, 'song');
    const q = query(songCol, orderBy('nbEcoutes', 'desc'), limit(3));
    const songSnapshot = await getDocs(q);
    const songList = songSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getSongByNbEcoute : ", songList);
    return songList;
  }

  //get artist by nbLikes
  async getArtistByNbLikes() {
    const artistCol = collection(this.db, 'artist');
    const q = query(artistCol, orderBy('nbLikes', 'desc'), limit(3));
    const artistSnapshot = await getDocs(q);
    const artistList = artistSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getArtistByNbLikes : ", artistList)
    return artistList;
  }

  //get artist by name
  async getArtistByFullname() {
    const artistCol = collection(this.db, 'artist');
    const q = query(artistCol, where('fullname', '==', "Ninho"));
    const artistSnapshot = await getDocs(q);
    const artistList = artistSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getArtistByNbLikes : ", artistList)
    return artistList;
  }

  //get last album
  async getLastAlbum() {
    const albumCol = collection(this.db, 'album');
    const q = query(albumCol, orderBy('createdAt', 'desc'), limit(1));
    const albumSnapshot = await getDocs(q);
    const albumList = albumSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getLastAlbum : ", albumList);
    return albumList;
  }

  //get last song heard
  async getLastSongHeard() {
    const songCol = collection(this.db,'song');
    const q = query(songCol, orderBy('dateEcoute', 'desc'), limit(3));
    const songSnapshot = await getDocs(q);
    const songList = songSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getLastSongHeard : ", songList);
    return songList;
  };

  //get user by name
  async getUserByName() {
    const usersCol = collection(this.db, 'user');
    const q = query(usersCol, where('firstName', '==', "Patrick"));
    const usersSnapshot = await getDocs(q);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getUserByName : ", usersList);
    return usersList;
  }

  //get artist by id
  async getArtistById(artistId = 'eiT0esFN8xYFDPNBwox1') {
    const artistCol = collection(this.db, 'artist');
    const q = query(
      artistCol,
      where(documentId(), '==', artistId)
    );
    const artistSnapshot = await getDocs(q);
    const artistList = artistSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getArtistById : ", artistList);
    return artistList;
  }

  //get user by email and password
  async getUserByEmailPassword($email: string, $password: string) {
    const usersCol = collection(this.db, 'user');
    const q = query(
      usersCol,
      where('email', '==', $email),
      where('password', '==', $password)
    );
    const usersSnapshot = await getDocs(q);
    const usersList = usersSnapshot.docs.map((doc) => {
      const data = doc.data();
      return { idDocument: doc.id, ...data };
    });
    console.log("Voici le getUserByEmailPassword : ", usersList);
    return usersList;
  }

  getUserByEmailPasswordObservable($email: string, $password: string) {
    return from(this.getUserByEmailPassword($email, $password));
  }


  constructor() {}
}
