import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  private selectedCategorySubject = new BehaviorSubject<string>('all');
  selectedCategory$: Observable<string> = this.selectedCategorySubject.asObservable();

  constructor(private http:HttpClient) { }

  getNews(category: string): Observable<any[]> {
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&from=2024-04-29&sortBy=publishedAt&apiKey=748871bab68540c58682ef248103b04d`;
    return this.http.get<any>(apiUrl).pipe(map(response => response.articles));
  }

  getNewsCategory(category:string){
    this.selectedCategorySubject.next(category);
  }
}
