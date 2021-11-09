import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';
import { Medicine } from '../common/medicine';
import { MedicineCategory } from '../common/medicine-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/medicines";
  private categoryUrl = "http://localhost:8080/api/v1/medicine-category";

  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId: number): Observable<Medicine[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    console.log(searchUrl)
    return this.getBooksList(searchUrl);
  }

  getBooksPaginate(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  getBookCategories(): Observable<MedicineCategory[]>{
    console.log(this.categoryUrl);
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.medicineCateogry)
    );
  }

  searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    //return this.getBooksList(searchUrl);
    console.log(searchUrl)
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  private getBooksList(searchUrl: string): Observable<Medicine[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.medicines)
    );
  }

  get(bookId: number): Observable<Medicine> {
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    console.log(bookDetailsUrl)
    console.log(this.httpClient.get<Medicine>(bookDetailsUrl))
    return this.httpClient.get<Medicine>(bookDetailsUrl);
  }
}

interface GetResponseBooks{
  _embedded: {
    medicines: Medicine[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}

interface GetResponseBookCategory{
  _embedded: {
    medicineCateogry: MedicineCategory[];
  }
}
