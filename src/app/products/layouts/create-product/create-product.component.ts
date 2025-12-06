import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ExitPage } from '../../../common/guards/exit-page.guard';
import { Observable, from } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Product } from '../../../models/products/Products';
import { ImagePickerComponent } from '../../../common/layouts/image-picker/image-picker.component';
import Swal from 'sweetalert2';
import { ProductService } from '../../../common/services/product.service';
import { ProductCategory } from '../../../models/products/ProductType';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { IconSelectorComponent } from '../../../common/layouts/icon-selector/icon-selector.component';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from '../../../models/products/ProductDetails';

import { Editor, NgxEditorModule, Toolbar, TOOLBAR_FULL } from 'ngx-editor';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
type ProductDetailsForm = FormGroup<{
  icon: FormControl<string>;
  value: FormControl<string>;
}>;
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ImagePickerComponent,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    IconSelectorComponent,
    NgxEditorModule,
    MatChipsModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit, OnDestroy, ExitPage {
  product: Product | null = null;
  id: string | null = null;
  isLoading = false;
  unsavedChanges = true;

  productForm: FormGroup;
  thumbnail: File | null = null;

  categories: ProductCategory[] = [
    'Foods & Restaurants',
    'Hotels',
    'Travel & Tours',
  ];
  editor: Editor | null = null;
  html = '';
  data: Toolbar = TOOLBAR_FULL;
  images: File[] = [];
  preview: string[] = [];

  onImagePicked(file: File | null) {
    if (!file) return;

    // Add to images array
    this.images.push(file);

    // Generate preview URL
    const reader = new FileReader();
    reader.onload = () => {
      this.preview.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  deleteImage(index: number) {
    if (index < 0 || index >= this.images.length) {
      return; // defensive check
    }

    this.images.splice(index, 1);
    this.preview.splice(index, 1);
  }
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    this.productForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      sku: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
      details: this.fb.array<ProductDetailsForm>([]),
      cost: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      stockAlert: [false],
      threshold: [0],
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.loadProduct(this.id);
      } else {
        this.isLoading = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  // ---- DETAILS FORM ARRAY ---- //
  get detailsArray() {
    return this.productForm.get('details') as FormArray<ProductDetailsForm>;
  }

  addDetail() {
    const group = this.fb.group({
      icon: ['', Validators.required],
      value: ['', Validators.required],
    }) as ProductDetailsForm;

    this.detailsArray.push(group);
  }

  removeDetail(index: number) {
    this.detailsArray.removeAt(index);
  }

  onThumbnailPicked(file: File | null) {
    this.thumbnail = file;
  }

  // ---- LOAD PRODUCT (EDIT MODE) ---- //
  loadProduct(id: string) {
    // this.productService.getById(id).subscribe((product) => {
    //   if (!product) {
    //     this.isLoading = false;
    //     return;
    //   }
    //   this.product = product;
    //   this.productForm.patchValue(product);
    //   // Load details
    //   product.details.forEach((d) => {
    //     this.detailsArray.push(
    //       this.fb.group({
    //         icon: [d.icon],
    //         value: [d.value],
    //       }) as ProductDetailsForm
    //     );
    //   });
    //   this.isLoading = false;
    //   this.unsavedChanges = false;
    // });
  }

  // ---- EXIT GUARD ---- //
  canExit(): boolean | Observable<boolean> {
    if (this.unsavedChanges) {
      return from(
        Swal.fire({
          title: 'Unsaved changes',
          text: 'You have unsaved changes. Leave anyway?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, leave',
          cancelButtonText: 'No, stay',
        }).then((res) => res.isConfirmed)
      );
    }
    return true;
  }

  back() {
    this.location.back();
  }

  // ---- SUBMIT ---- //
  async submit() {
    if (this.id === null) {
      await Swal.fire({
        icon: 'error',
        title: 'Missing Product ID',
        text: 'Product ID is required to proceed.',
      });
      return;
    }

    if (this.thumbnail === null) {
      await Swal.fire({
        icon: 'warning',
        title: 'Thumbnail Required',
        text: 'Please select a thumbnail image before saving.',
      });
      return;
    }

    if (this.productForm.invalid) {
      await Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fix the errors in the form.',
      });
      return;
    }

    const formData = this.productForm.value;

    const mappedDetails: ProductDetails[] = this.detailsArray.value.map(
      (d) => ({
        icon: d.icon!,
        value: d.value!,
      })
    );

    const newProduct: Product = {
      id: this.id,
      thumbnail: '',
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      description: this.html,
      details: mappedDetails,
      cost: formData.cost,
      price: formData.price,
      available: formData.quantity > 0,
      quantity: formData.quantity,
      ratings: 0,
      expiration: '08/12/2028',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      this.isLoading = true;

      await this.productService.create(
        newProduct,
        this.thumbnail,
        this.images.filter((e): e is File => e !== null)
      );
      this.unsavedChanges = false;

      await Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: 'Product added successfully.',
      });

      this.back();
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not save product. Try again.',
      });
    } finally {
      this.isLoading = false;
    }
  }

  skuGenerator(len: number = 10) {
    if (len <= 0) {
      throw new Error('Length must be a positive integer');
    }

    let result = '';
    const digits = '0123456789';

    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      result += digits[randomIndex];
    }
    this.productForm.patchValue({
      sku: result,
    });
  }
}
