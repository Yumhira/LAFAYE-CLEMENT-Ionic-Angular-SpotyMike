import { Timestamp } from "firebase/firestore/lite";
import { IArtist } from "./artist";
import { IAlbum } from "./album";

export interface ISong {
    id: string;
    title: string;
    cover: string;
    artistId: string;
    albumId: IAlbum[];
    genre: string;
    url: string;
    lyrics: string;
    featuring?: IArtist[];
    visibility: boolean;
    isLiked: boolean;
    nbEcoutes?: number;
    dateEcoute?: Timestamp;
}