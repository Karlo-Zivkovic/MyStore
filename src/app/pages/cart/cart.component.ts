import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './cart.component.html',
})

export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartSubject.subscribe((_cart) => {
      this.cart = _cart;
    });
  }

  totalPerItem(item: Product) {
    return item.quantity * item.price;
  }

  totalCartCost() {
    return this.cart
      .map((product) => product.quantity * product.price)
      .reduce((acc, cur) => acc + cur, 0);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  onAddQuantity(item: Product) {
    this.cartService.addToCart(item);
  }

  decreaseQuantity(item: Product) {
    this.cartService.decreaseQuantity(item);
  }

  removeItemFromCart(item:Product){
   this.cartService.removeFromCart(item)
  }
}
