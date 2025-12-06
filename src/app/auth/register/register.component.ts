import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  hide = true;

  get formInvalid() {
    return (
      this.name.invalid ||
      this.phone.invalid ||
      this.email.invalid ||
      this.password.invalid
    );
  }

  submit() {
    if (this.formInvalid) return;

    const body = {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value,
    };

    console.log('Register request:', body);

    // call api here
  }
}
