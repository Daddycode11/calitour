import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-icon-selector-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './icon-selector-dialog.component.html',
  styleUrl: './icon-selector-dialog.component.scss',
})
export class IconSelectorDialogComponent {
  searchText = '';

  icons: string[] = [
    // 🛍️ Product Details
    'shopping_cart',
    'local_offer',
    'category',
    'inventory',
    'price_check',
    'description',
    'image',
    'star',
    'verified',
    'info',
    'check_circle',
    'warning',
    'build',

    // 📅 Booking System
    'event',
    'schedule',
    'calendar_today',
    'room',
    'person',
    'group',
    'cancel',
    'pending',
    'phone',
    'mail',
    'notifications',

    // 🧠 Semantic Enhancers
    'edit',
    'delete',
    'visibility',
    'lock',
    'attach_file',

    // 🔧 Utility
    'home',
    'pets',
    'favorite',
    'store',
    'account_circle',
    'health_and_safety',
  ];
  constructor(private dialogRef: MatDialogRef<IconSelectorDialogComponent>) {}

  get filteredIcons() {
    return this.icons.filter((i) =>
      i.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectIcon(icon: string) {
    this.dialogRef.close(icon);
  }

  close() {
    this.dialogRef.close();
  }
}
