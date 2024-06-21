import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { ISong } from './../../interfaces/song';
import { createReducer, on } from '@ngrx/store';
import * as ActionSongs from '../action/song.action';

export interface SongState extends EntityState<ISong> {
    load: boolean;
}

// START - Sort

export function selectSongId(a: ISong): string {
    return a.id;
}

export function sortByTitle(a: ISong, b: ISong): number {
    return a.title.localeCompare(b.title);
}

export const adapter: EntityAdapter<ISong> = createEntityAdapter<ISong> ({
    selectId: selectSongId,
    sortComparer: sortByTitle,
});

export const initialState: SongState = adapter.getInitialState({
    load: false,
});

// END - Sort

export const songReducer = createReducer(
  initialState,
  on(ActionSongs.loadSong, (state) => ({ ...state })),
  on(ActionSongs.addSong, (state, listSong: any ) => ({ ...state, songs: listSong.songs }))
);

// Récupération
export const { selectAll } = adapter.getSelectors();

