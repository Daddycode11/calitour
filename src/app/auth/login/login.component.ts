import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../../models/user/User';
import Swal from 'sweetalert2';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.login(email, password);
  }

  login(email: string, password: string) {
    this.isLoading = true;

    this.authService
      .login(email, password)
      .then((user) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting...',
          timer: 2000,
          showConfirmButton: false,
        });

        // 2-second delay before navigation
        setTimeout(() => {
          this.navigate(user.role);
        }, 2000);
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: e.message || 'Invalid email or password',
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  navigate(role: UserRole) {
    this.router.navigate([role === UserRole.ADMIN ? '/admin' : '/']);
  }
}
