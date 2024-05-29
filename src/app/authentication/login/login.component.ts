import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService)
  submitted = false;


  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }
  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }
  submit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginForm.value);
    }
  }
}