import { Component } from '@angular/core';

import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Firestore, doc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ProductService } from '../../../common/services/product.service';
import { AppConstants } from '../../../common/utils/Constants';
import { SAMPLE_PRODUCTS } from '../../../models/products/Products';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ProductCardComponent,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products$ = of(SAMPLE_PRODUCTS);
  constructor(
    private productService: ProductService,
    private firestore: Firestore,
    private router: Router
  ) {}

  create(id: string | null = null) {
    if (id === null) {
      id = doc(collection(this.firestore, AppConstants.PRODUCT_COLLECTION)).id;
    }
    this.router.navigate(['/products/create', id]);
  }
}
