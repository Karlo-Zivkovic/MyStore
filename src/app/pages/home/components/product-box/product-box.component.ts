import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Product } from '../../../../models/product.model';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode: boolean = false;
  @Input() product: Product | undefined;

  constructor(private cartService: CartService) {}

  addToCart(item: Product) {
    const newItem = { ...item, quantity: 1 };
    this.cartService.addToCart(newItem);
  }
}
