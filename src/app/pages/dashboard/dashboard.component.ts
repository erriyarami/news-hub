import { Component, ViewChild, inject } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard.component';
import { Role } from '../../models/role';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminDashboardComponent,UserDashboardComponent,GuestDashboardComponent,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isAdmin = false;
  isUser = false;
  isGuest = false;
  router = inject(Router);

  ngOnInit(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if(currentUser.role === Role.Admin){
        this.isAdmin = true;
      }else if(currentUser.role === Role.User){
        this.isUser = true;
      }
      else{
        this.isGuest = true;
      }
    }

}
