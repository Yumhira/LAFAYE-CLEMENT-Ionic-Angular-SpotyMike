import { Timestamp } from "firebase/firestore/lite";
import { IArtist } from "./artist";
import { ISong } from "./song";

export interface IAlbum {
    id: string;
    title: string;
    cover: string;
    genre: string;
    artistId: IArtist[];
    songs: ISong[];
    visibility: boolean;
    year: string;
    createdAt: Timestamp;
}