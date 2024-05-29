import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './authentication/register/register.component';
import { GuestDashboardComponent } from './pages/dashboard/guest-dashboard/guest-dashboard.component';
import { UserDashboardComponent } from './pages/dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {path:'',component:RegisterComponent},
    {path:'dashboard/admin',component:AdminDashboardComponent},
    {path:'dashboard/user',component:UserDashboardComponent},
    {path:'dashboard/guest',component:GuestDashboardComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
];
