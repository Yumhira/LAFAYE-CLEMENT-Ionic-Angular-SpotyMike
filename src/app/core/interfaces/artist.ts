import { Timestamp } from "firebase/firestore/lite";
import { ISong } from "./song";
import { IAlbum } from "./album";

export interface IArtist {
    id: string;
    fullname: string;
    avatar: string;
    description?: string;
    label: string;
    songs?: ISong[];
    albums?: IAlbum[];
    createdAt: Timestamp;
}