import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Subscription } from 'rxjs';

const cartAnimation = trigger('cartAnimation', [
  state(
    'closed',
    style({
      height: '0',
      opacity: '0',
      display: 'none',
    }),
  ),
  state(
    'open',
    style({
      height: '*',
      opacity: '1',
      display: 'block',
    }),
  ),
  transition('closed <=> open', [animate('300ms ease-in-out')]),
]);

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, MatBadgeModule],
  templateUrl: './header.component.html',
  animations: [cartAnimation],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartState = 'closed';
  cart: Product[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartSubject.subscribe(
      (_products) => {
        this.cart = _products;
      },
    );
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleCart() {
    this.cartState = this.cartState === 'closed' ? 'open' : 'closed';
    this.getTotalItems();
  }

  getTotalItems() {
    return this.cart
      .map((item) => item.quantity)
      .reduce((acc, cur) => acc + cur, 0);
  }
  getTotalProductCost(product: Product) {
    const totalPrice = product.price * product.quantity;
    return totalPrice;
  }

  getTotalProductsCost() {
    return this.cart
      .map((product) => product.quantity * product.price)
      .reduce((acc, cur) => acc + cur, 0);
  }

  clearCart() {
    this.cartState = 'closed';
    this.cartService.clearCart();
  }

  viewCart() {
    this.cartState = 'closed';
  }
}
