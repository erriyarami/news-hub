import { Component, ViewChild, inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Subject, config } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { Role } from '../../../models/role';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-guest-dashboard',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,DatePipe],
  templateUrl: './guest-dashboard.component.html',
  styleUrl: './guest-dashboard.component.css'
})
export class GuestDashboardComponent {
  newsService = inject(NewsService);
  newsList:any;
  displayedColumns: string[] = ['image','author', 'title', 'publishedAt','content'];
  dataSource = new MatTableDataSource<any>();
  router = inject(Router);
  toaster = inject(ToastrService);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.getNews();
  }
  getNews(){
    this.newsService.getNews('all').subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
    });
  }

  handlePageEvent(event: PageEvent) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if(currentUser.role === Role.Guest){}else{
      this.toaster.error('You are New User Please Register')
      this.router.navigate(['/register'])
    }
  }
}
