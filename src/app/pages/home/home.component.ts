import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftFilterComponent } from './components/left-filter/left-filter.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';

const sortAnimation = trigger('sortAnimation', [
  state(
    'closed',
    style({
      height: '0',
      opacity: '0',
    }),
  ),
  state(
    'open',
    style({
      height: '*',
      opacity: '1',
    }),
  ),
  transition('closed <=> open', [animate('300ms ease-in-out')]),
]);
const numOfShownProductsAnimation = trigger('numOfShownProductsAnimation', [
  state(
    'closed',
    style({
      height: '0',
      opacity: '0',
    }),
  ),
  state(
    'open',
    style({
      height: '*',
      opacity: '1',
    }),
  ),
  transition('closed <=> open', [animate('300ms ease-in-out')]),
]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LeftFilterComponent,
    MatIconModule,
    ProductBoxComponent,
  ],
  templateUrl: './home.component.html',
  animations: [sortAnimation, numOfShownProductsAnimation],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] | undefined;
  sortState = 'closed';
  numOfShownProducts = 'closed';
  limit = '12';
  sort = 'desc';
  productsSubscription: Subscription | undefined;
  cols = 3;
  category: string | undefined;
  error: string | null = null;
  isLoading: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productsSubscription = this.storeService
      .getAllProducts(this.limit, this.sort, this.category)
      .subscribe(
        (_products) => {
          this.isLoading = false
          const productsWithQuantity = _products.map((product) => ({
            ...product,
            quantity: 1,
          }));
          this.products = productsWithQuantity;
        },
        (error) => {
          this.error = 'Failed to fetch data. Please try again later.';
        },
      );
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  toggleSort() {
    this.sortState = this.sortState === 'closed' ? 'open' : 'closed';
  }

  toggleNumOfShownProducts() {
    this.numOfShownProducts =
      this.numOfShownProducts === 'closed' ? 'open' : 'closed';
  }

  updateLimit(limit: number): void {
    this.numOfShownProducts = 'closed';
    this.limit = limit.toString();
    this.getProducts();
  }

  updateSort(sort: string): void {
    this.sort = sort;
    this.sortState = 'closed';
    this.getProducts();
  }

  handleColsChange(numCols: number) {
    this.cols = numCols;
    console.log(this.cols);
  }

  onGetCategory(category: string) {
    this.category = category;
    this.getProducts();
  }
}
