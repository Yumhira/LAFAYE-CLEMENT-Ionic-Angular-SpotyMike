import { Timestamp } from "firebase/firestore/lite";
import { IAlbum } from "./album";
import { IArtist } from "./artist";
import { IPlaylist } from "./playlist";
import { ISong } from "./song";

type ERoleUser = 'user' | 'artist';

export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    sexe?: boolean;
    role: ERoleUser;
    email: string;
    password: string;
    isEmailVerified: boolean;
    artistId?: IArtist[]; 
    dateBirth: string;
    tel?: string;
    isArtist: boolean;
    likedArtists?: IArtist[];
    likedSongs?: ISong[];
    likedAlbums?: IAlbum[];
    likedPlaylists?: IPlaylist[];
    createdAt: Timestamp;
}

export interface IAccessToken {
    token: string;
    expires: string|Date;
}

export interface IToken {
    access: IAccessToken;
    refresh: IAccessToken;
}