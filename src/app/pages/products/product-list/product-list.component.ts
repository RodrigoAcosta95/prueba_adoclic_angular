import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = '';
  selectedLimit: number = 5;
  categories: string[] = [];
  limits: number[] = [5, 10, 15, 20];

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    let url = 'https://fakestoreapi.com/products';
    if (this.selectedCategory) {
      url += `/category/${this.selectedCategory}`;
    }
    url += `?limit=${this.selectedLimit}`;

    this.productService.getProductsByUrl(url).subscribe(products => {
      this.products = products;
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  applyFilters(): void {
    if (this.selectedCategory === 'Todos') {
      this.selectedCategory = '';
    }
    this.loadProducts();
  }

  openModal(product: Product) {
    this.dialog.open(ProductDetailComponent, {
      width: '400px',
      data: product.id
    });
  }
}
