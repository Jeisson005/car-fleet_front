import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.login(this.form.value.username, this.form.value.password)
        .subscribe({
          next: (result) => {
            localStorage.setItem('token', result.token);
            this.router.navigate(['']);
          },
          error: (error) => {
            this.errorMessage = error.error.message;
          }
        }
        );
    }
  }
}
