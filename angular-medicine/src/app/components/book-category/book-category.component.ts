import { Component, OnInit } from '@angular/core';
import { MedicineCategory } from 'src/app/common/medicine-category';
import { BookCategory } from '../../common/book-category';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {

  bookCategories: MedicineCategory[];

  constructor(private _bookService: BookService) { }

  ngOnInit() {
    this.listBookCategories();
    console.log(this.bookCategories)
  }

  listBookCategories(){
    this._bookService.getBookCategories().subscribe(
      data => this.bookCategories = data
    );
  }

}
