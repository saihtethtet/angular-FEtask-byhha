import { createSelector } from '@ngrx/store';

export const selectFavorites = (state: any) => state.favorites;

export const isFavorite = (id: string) =>
  createSelector(selectFavorites, (favorites: string[]) => favorites.includes(id));
