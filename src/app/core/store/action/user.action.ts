import { createAction, props } from '@ngrx/store';
import { IUser } from '../../interfaces/user';

export const loadUser = createAction('load User');
export const addUser = createAction('add User', props<{ songs: IUser[] }>);
export const updateUser = createAction('update User', props<{ songs: IUser[] }>);
export const removeUser = createAction('remove User', props<{ songs: IUser[] }>);
