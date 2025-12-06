import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './image-picker.component.html',
  styleUrl: './image-picker.component.scss',
})
export class ImagePickerComponent {
  @Input() width: string = '100%';
  @Input() height: string = '200px';

  @Output() onImagePicked = new EventEmitter<File | null>();
  @Input() previewEnabled: boolean = true;
  previewUrl: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.onImagePicked.emit(file);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(file);
    } else {
      this.onImagePicked.emit(null);
      this.previewUrl = null;
    }
  }
}
