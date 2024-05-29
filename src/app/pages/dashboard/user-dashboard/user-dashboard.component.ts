import { Component, ViewChild, inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Subject, config } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { Role } from '../../../models/role';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,DatePipe],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  newsService = inject(NewsService);
  newsList:any;
  displayedColumns: string[] = ['image','author', 'title', 'publishedAt','content'];
  dataSource = new MatTableDataSource<any>();
 
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
