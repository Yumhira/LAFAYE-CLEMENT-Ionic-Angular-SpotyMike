import { Timestamp } from "firebase/firestore/lite";
import { IArtist } from "./artist";
import { IAlbum } from "./album";

export interface ISong {
    id: string;
    title: string;
    cover: string;
    artistId: IArtist[];
    albumId: IAlbum[];
    genre: string;
    url: string;
    featuring?: IArtist[];
    visibility: boolean;
    nbEcoutes?: number;
    dateEcoute?: Timestamp;
}