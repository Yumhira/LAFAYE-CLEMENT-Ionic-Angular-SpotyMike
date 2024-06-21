import { createAction, props } from '@ngrx/store';
import { ISong } from '../../interfaces/song';

export const loadSong = createAction('load Song');
export const addSong = createAction('add Song', props<{ songs: ISong[] }>());
export const updateSong = createAction('update Song', props<{ songs: ISong[] }>);
export const removeSong = createAction('remove Song', props<{ songs: ISong[] }>);
