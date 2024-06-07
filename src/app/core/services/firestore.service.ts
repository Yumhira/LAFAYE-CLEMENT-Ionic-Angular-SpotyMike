import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, documentId ,query, where, limit, doc, getDoc, DocumentReference, orderBy } from 'firebase/firestore/lite';
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
    console.log("Voici le getAlbums : ", albumsList);
    return albumsList;
  }

  // GET ALBUM BY ARTIST NAME
  async getAlbums2() {
    const albumsCol = collection(this.db, 'albums');
    const q = query(albumsCol, where('artist.name', '==', 'Mike'), limit(3));
    const albumsSnapshot = await getDocs(q);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getAlbums2 : ", albumsList);
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
  async getUser() {
    const usersCol = collection(this.db, 'user');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getUser : ", usersList);
    return usersList;
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
  async getPlaylist() {
    const playlistCol = collection(this.db, 'playlist');
    const playlistSnapshot = await getDocs(playlistCol);
    const playlistList = playlistSnapshot.docs.map((doc) => doc.data());
    console.log("Voici le getPlaylist : ", playlistList);
    return playlistList;
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


  constructor() {}
}
