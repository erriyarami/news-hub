import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';
import { NgIf } from '@angular/common';
import { Role } from '../../models/role';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  service = inject(AuthService);
  newsService = inject(NewsService);
  usersRole: any[] = [];
  guestRole: any[] = [];
  currentUser:any;
  showMe:boolean;
  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if(this.currentUser.role === Role.Admin ||this.currentUser.role === Role.User || this.currentUser.role === Role.Guest){
      this.showMe = false;
    }else{
      this.showMe = true;
    }
    this.service.getUsersByRole('User').subscribe((users: any[]) => {
      this.usersRole = users;
    });
    this.service.getUsersByRole('Guest').subscribe((users: any[]) => {
      this.guestRole = users;
    });
  }
  logout(){
    this.service.logout();
  }
  onCategoryChange(category: string) {
    this.newsService.getNewsCategory(category);
  }
 
}
