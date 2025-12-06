import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { merge } from 'rxjs';
import { AuthService } from '../../common/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  setupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.setupForm = this.fb.nonNullable.group(
      {
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordsMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  // ----- Getters -----

  get name(): AbstractControl {
    return this.setupForm.get('name')!;
  }

  get phone(): AbstractControl {
    return this.setupForm.get('phone')!;
  }

  get email(): AbstractControl {
    return this.setupForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.setupForm.get('password')!;
  }

  get confirmPassword(): AbstractControl {
    return this.setupForm.get('confirmPassword')!;
  }

  get formInvalid(): boolean {
    return this.setupForm.invalid;
  }

  // ----- Validator -----

  private passwordsMatchValidator(pass: string, confirm: string) {
    return (form: AbstractControl) => {
      const password = form.get(pass)?.value;
      const confirmPassword = form.get(confirm)?.value;

      if (password !== confirmPassword) {
        form.get(confirm)?.setErrors({ mismatch: true });
      } else {
        form.get(confirm)?.setErrors(null);
      }

      return null;
    };
  }

  // ----------------------------------------------------------------
  // SUBMIT HANDLER (with delay + loading)
  // ----------------------------------------------------------------

  submit() {
    if (this.formInvalid) {
      this.setupForm.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    this.isLoading = true;

    const { name, phone, email, password } = this.setupForm.value;

    // Simulate 2 second delay
    setTimeout(() => {
      this.createAdmin(name, phone, email, password);
    }, 2000);
  }

  // ----------------------------------------------------------------
  // CREATE ADMIN
  // ----------------------------------------------------------------

  private createAdmin(
    name: string,
    phone: string,
    email: string,
    password: string
  ) {
    this.isLoading = true; // start loading

    this.authService
      .createAdmin(name, phone, email, password)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Admin Created',
          text: 'The admin account has been successfully created.',
          timer: 2000,
          showConfirmButton: false,
        });

        // Navigate after alert
        this.router.navigate(['/admin']);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create admin. Please try again.',
        });
        console.error('Error creating admin:', err);
      })
      .finally(() => {
        this.isLoading = false; // stop loading
      });
  }
}
