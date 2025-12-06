import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconSelectorDialogComponent } from '../icon-selector-dialog/icon-selector-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-icon-selector',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './icon-selector.component.html',
  styleUrl: './icon-selector.component.scss',
})
export class IconSelectorComponent {
  @Input() selectedIcon: string | null = null;
  @Output() iconSelected = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  openSelector() {
    const dialogRef = this.dialog.open(IconSelectorDialogComponent, {
      width: '400px',
      height: '500px',
      panelClass: 'icon-selector-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedIcon = result;
        this.iconSelected.emit(result);
      }
    });
  }
}
