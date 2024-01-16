import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { StoreService } from '../../../../services/store.service';

@Component({
  selector: 'app-left-filter',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './left-filter.component.html',
})
export class LeftFilterComponent implements OnInit {
  panelOpenState = false;
  categories: string[] | undefined;
  @Output() categoryEmiter = new EventEmitter<string>();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  setCategory(category: string) {
    this.categoryEmiter.emit(category);
  }
}
