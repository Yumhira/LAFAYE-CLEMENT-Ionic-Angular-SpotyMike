import { createAction, props } from '@ngrx/store';
import { IArtist } from '../../interfaces/artist';

export const loadArtist = createAction('load Artist');
export const addArtist = createAction('add Artist', props<{ songs: IArtist[] }>);
export const updateArtist = createAction('update Artist', props<{ songs: IArtist[] }>);
export const removeArtist = createAction('remove Artist', props<{ songs: IArtist[] }>);
