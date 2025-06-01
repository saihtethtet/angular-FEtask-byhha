import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Response } from '../../models/response.model';
import { ApiService } from '../../services/api.service';
import { addFavorite, removeFavorite } from '../../store/actions/favorites.actions';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // imports: [CommonModule, RouterModule]
})
export class ListComponent implements OnInit {
  allCharacters: Response[] = [];
  books: Response[] = [];
  searchKey: string = '';
  page = 1;
  pageSize = 9;

  constructor(
    private apiService: ApiService,
    private store: Store<{ favorites: string[] }>
  ) {}

  ngOnInit(): void {
    this.apiService.getBooks(this.page).subscribe(data => {
      this.allCharacters = data.map(c => ({
        ...c,
        id: c.url.split('/').pop() || ''
      }));
      this.paginateBooks();
    });
  }

  get filteredCharacters(): Response[] {
    const keyword = this.searchKey.toLowerCase().trim();
    return this.allCharacters.filter(c =>
      c.name?.toLowerCase().includes(keyword)
    );
  }

  get startIndex(): number {
    return (this.page - 1) * this.pageSize;
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  updateVisibleBooks(): void {
    this.page = 1;
    this.paginateBooks();
  }

  paginateBooks(): void {
    const filtered = this.filteredCharacters;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.books = filtered.slice(start, end);
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.filteredCharacters.length) {
      this.page++;
      this.paginateBooks();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.paginateBooks();
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
    this.store.select('favorites').pipe(take(1)).subscribe(favs => {
      exists = favs.includes(id);
    });
    return exists;
  }
}
