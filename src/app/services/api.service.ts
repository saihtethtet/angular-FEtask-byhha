import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../models/response.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private baseUrl = 'https://anapioficeandfire.com/api/';

    constructor(private http: HttpClient) {}

    // getCharacters(page: number = 1, pageSize: number = 20): Observable<Response[]> {
    //     console.log('list api', this.baseUrl + 'characters?page=' + page + '&pageSize=' + pageSize)
    //     return this.http.get<Response[]>(this.baseUrl + 'characters?page=' + page + '&pageSize=' + pageSize);
    // }

    getBooks(page: number): Observable<Response[]> {
        return this.http.get<Response[]>( this.baseUrl + 'books?page=' + page + '&pageSize=1000').pipe(
            map(characters =>
            characters.map(character => ({
                ...character,
                id: character.url.split('/').pop() // ✅ inject id from URL
            }))
            )
        );
    }


    getBookById(id: string): Observable<Response> {
        return this.http.get<Response>( this.baseUrl + 'books/'+ id);
    }
}