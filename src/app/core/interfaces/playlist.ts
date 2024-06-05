import { ISong } from "./song";
import { IUser } from "./user";

export interface IPlaylist {
    id: string;
    name: string;
    cover: string;
    songs: ISong[];
    userId: IUser[];
}