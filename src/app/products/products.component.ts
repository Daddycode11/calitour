import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';

import { ProductCardComponent } from './layouts/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from '../common/services/product.service';
import { collection, doc, Firestore } from '@angular/fire/firestore';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppConstants } from '../common/utils/Constants';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ProductCardComponent,
    MatInputModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(
    private productService: ProductService,
    private firestore: Firestore,
    private router: Router
  ) {}
}
