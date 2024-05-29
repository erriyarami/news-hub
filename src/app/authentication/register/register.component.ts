import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!:FormGroup;
  builder = inject(FormBuilder);
  authService = inject(AuthService);
  toaster = inject(ToastrService)
  userRoles!: Role[];
  router = inject(Router);
  submitted = false;
  
  ngOnInit() {
    this.createRegisterForm();
    this.userRoles = Object.values(Role);
  }
  createRegisterForm() {
      this.registerForm = this.builder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      role:['select Role'],
    })
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  register(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.authService.register(this.registerForm.value).subscribe(res => {
        this.toaster.success("Succesfully Registered");
        this.router.navigate(['/login']);
      });
    }
  }
}
