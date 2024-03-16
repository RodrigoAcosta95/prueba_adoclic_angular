import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public idProducto: number, 
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductDetailComponent>
  ) { }

  ngOnInit(): void {
    if (typeof this.idProducto === 'number') { 
      this.productService.getProductById(this.idProducto).subscribe(
        product => {
          this.product = product;
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
    } else {
      console.error('Invalid product ID');
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
