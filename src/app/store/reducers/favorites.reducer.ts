import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../actions/favorites.actions';

export const initialState: string[] = [];

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { id }) => state.includes(id) ? state : [...state, id]),
  on(removeFavorite, (state, { id }) => state.filter(fav => fav !== id))
);
