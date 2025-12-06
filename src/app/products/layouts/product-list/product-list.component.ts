import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductCardComponent } from '../product-card/product-card.component';
import {
  Firestore,
  doc,
  collection,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ProductService } from '../../../common/services/product.service';
import { AppConstants } from '../../../common/utils/Constants';
import { Product, SAMPLE_PRODUCTS } from '../../../models/products/Products';
import { ProductCategory } from '../../../models/products/ProductType';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import Swal from 'sweetalert2';
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
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'thumbnail',
    'name',
    'category',
    'price',
    'stock',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>([]);
  lastDoc: QueryDocumentSnapshot<Product> | null = null;
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.loadProducts();

    this.paginator.page.subscribe(() => this.onPageChange());
  }

  async loadProducts(reset: boolean = false): Promise<void> {
    if (this.isLoading) return;

    this.isLoading = true;

    try {
      // If resetting (new page size), clear current data
      if (reset) {
        this.dataSource.data = [];
        this.lastDoc = null;
      }

      const res = await this.productService.getProducts(
        this.paginator.pageSize,
        this.lastDoc
      );

      // Append new products
      this.dataSource.data = [...this.dataSource.data, ...res.data];
      this.lastDoc = res.last;

      // Initialize paginator and sort if not already
      if (!this.dataSource.paginator) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      this.isLoading = false;
    }
  }

  /** Handle paginator page changes */
  onPageChange(): void {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    // Load next page if not yet loaded
    if ((pageIndex + 1) * pageSize > this.dataSource.data.length) {
      this.loadProducts();
    }
  }

  /** Apply search filter */
  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  create(id: string | null = null) {
    if (id === null) {
      id = doc(collection(this.firestore, AppConstants.PRODUCT_COLLECTION)).id;
    }
    this.router.navigate(['/admin/products/create', id]);
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService
          .deleteProduct(id)
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Product has been deleted.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });

            // Remove the deleted product from the table
            this.dataSource.data = this.dataSource.data.filter(
              (p) => p.id !== id
            );
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error',
              text: 'Could not delete product. Try again.',
              icon: 'error',
            });
            console.error('Delete error:', err);
          });
      }
    });
  }
}
