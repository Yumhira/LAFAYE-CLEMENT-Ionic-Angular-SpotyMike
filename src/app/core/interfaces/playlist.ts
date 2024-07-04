import { ISong } from "./song";
import { IUser } from "./user";

export interface IPlaylist {
    id: string;
    name: string;
    cover: string;
    isLiked: boolean;
    songs: ISong[];
    userId: IUser[];
}