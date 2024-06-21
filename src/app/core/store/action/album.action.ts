import { createAction, props } from '@ngrx/store';
import { IAlbum } from '../../interfaces/album';

export const loadAlbum = createAction('load Album');
export const addAlbum = createAction('add Album', props<{ Albums: IAlbum[] }>);
export const updateAlbum = createAction('update Album', props<{ Albums: IAlbum[] }>);
export const removeAlbum = createAction('remove Album', props<{ Albums: IAlbum[] }>);
