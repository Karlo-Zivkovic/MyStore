import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  cartSubject = new BehaviorSubject<Product[]>(this.cart);

  getCart() {
    return this.cart;
  }


  addToCart(item: Product) {

    let sameItem: Product | undefined = this.cart.find(
      (el) => el.id === item.id,
    );

    if (sameItem) {
      sameItem.quantity += 1;
    } else {
      this.cart.push(item);
    }
    this.cartSubject.next(this.cart.slice());
  }

  clearCart() {
    this.cart.length = 0;
    this.cartSubject.next([]);
  }

  removeFromCart(_item: Product) {
    const itemIndex = this.cart.findIndex((el) => el.id === _item.id);

    if (itemIndex !== -1) {
      this.cart.splice(itemIndex, 1);
      this.cartSubject.next([...this.cart]);
    }
  }

  decreaseQuantity(_item: Product) {
    const item = this.cart.find((el) => el.id === _item.id);

    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.cartSubject.next([...this.cart]);
    } else {
      this.removeFromCart(_item);
    }
  }
}
