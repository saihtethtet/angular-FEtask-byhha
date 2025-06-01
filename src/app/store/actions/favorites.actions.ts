import { createAction, props } from '@ngrx/store';

export const addFavorite = createAction('[Favorites] Add', props<{ id: string }>());
export const removeFavorite = createAction('[Favorites] Remove', props<{ id: string }>());
