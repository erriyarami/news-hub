import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth = new BehaviorSubject<boolean>(false);
  router = inject(Router)
  toaster = inject(ToastrService);

  baseAPI = 'http://localhost:3000';
  constructor(private http: HttpClient) {}


  getAllUsers(){
    return this.http.get(this.baseAPI + '/user');
  }

 
  login(credentials: any){
    this.getAllUsers().subscribe((users: any) => {
      const user = users.find((u:any) => u.email === credentials.email && u.password === credentials.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user.role === 'Admin') {
          this.toaster.success("Succesfully Login as Admin");
          this.router.navigate(['/dashboard/admin'])
        } else if(user.role === 'User') {
          this.toaster.success("Succesfully Login as User");
          this.router.navigate(['/dashboard/user'])
        }
        else if(user.role === 'Guest') {
          this.toaster.success("Succesfully Login as Guest");
          this.router.navigate(['/dashboard/guest'])
        }
      } else {
        this.toaster.error('Oops! Email or Password Incorrect.');
      }
    });
  }

 
  register(inputData:any):Observable<any>{
    return this.http.post(this.baseAPI + '/user',inputData);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getUsersByRole(role: string): Observable<any> {
    return this.http.get<any>(this.baseAPI + '/user')
    .pipe(
      map((users: any) => {
        const roles: string[] = [];
        users.forEach((user:any) => {
          if (user.role === role) {
            roles.push(user.role);
          }
        });
        return roles;
      })
    );
  }
}
