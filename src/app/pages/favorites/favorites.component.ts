import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Response } from '../../models/response.model';
import { ApiService } from '../../services/api.service';
import { take } from 'rxjs';
import { addFavorite, removeFavorite } from '../../store/actions/favorites.actions';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  allBooks: Response[] = [];
  books: Response[] = [];

  page = 1;
  pageSize = 9;

  constructor(private store: Store<{ favorites: string[] }>, private api: ApiService) {}

  ngOnInit(): void {
    this.store.select('favorites').subscribe(ids => {
      Promise.all(ids.map(id => this.api.getBookById(id).toPromise()))
        .then(results => {
          this.allBooks = results
            .filter((b): b is Response => b !== undefined)
            .map(book => ({
              ...book,
              id: book.url.split('/').pop() || ''
            }));

          this.updateVisibleBooks();
        });
    });
  }

  get startIndex(): number {
    return (this.page - 1) * this.pageSize;
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  updateVisibleBooks(): void {
    this.books = this.allBooks.slice(this.startIndex, this.endIndex);
  }

  nextPage(): void {
    if (this.endIndex < this.allBooks.length) {
      this.page++;
      this.updateVisibleBooks();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updateVisibleBooks();
    }
  }

  toggleFavorite(id: string): void {
    this.store.select('favorites').pipe(take(1)).subscribe(favs => {
      if (favs.includes(id)) {
        this.store.dispatch(removeFavorite({ id }));
      } else {
        this.store.dispatch(addFavorite({ id }));
      }
    });
  }

  isFavorite(id: string): boolean {
    let exists = false;
    this.store.select('favorites').pipe(take(1)).subscribe(favs => exists = favs.includes(id));
    return exists;
  }
}
