
import { Component, ViewChild, inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../../services/news.service';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  newsService = inject(NewsService);
  newsList:any;
  displayedColumns: string[] = ['image','author', 'title', 'publishedAt','content'];
  dataSource = new MatTableDataSource<any>();
  isAdmin = false;
  isUser = false;
  isGuest = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  selectedCategory: string = 'all';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.getNewsUpdate();
    this.applyFilter();
  }
  getNewsUpdate(){
    this.newsService.getNews(this.selectedCategory).subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(){
    this.newsService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
      this.getNewsUpdate();
    });
  }
}
