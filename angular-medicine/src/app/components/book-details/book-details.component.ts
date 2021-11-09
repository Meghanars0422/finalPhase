import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Medicine } from 'src/app/common/medicine';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Medicine = new Medicine();

  constructor(private _activatedRoute: ActivatedRoute,
              private _bookService: BookService,
              private _cartService: CartService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    )
  }

  getBookInfo(){
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._bookService.get(id).subscribe(
      data => {
        console.log(data);
        this.book = data;
      }
    );
  }

  addToCart(){
    console.log(`book name: ${this.book.name}, and price: ${this.book.unitPrice}`);
    const cartItem = new CartItem(this.book);
    this._cartService.addToCart(cartItem);
  }

}
