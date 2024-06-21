import { IAlbum } from "../interfaces/album";
import { IPlaylist } from "../interfaces/playlist";
import { ISong } from "../interfaces/song";

export interface AppState {
    songs: ISong[];
    playlists: IPlaylist[];
    albums: IAlbum[];
}