import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  articles: any;

  constructor(private newsService: NewsService) {
    this.newsService.getNews().subscribe({
      next: (data: any) => {
        console.log('woah, got something');
        console.log(data);
        this.articles = data.articles;
      },
      error: data => {
        console.log('error', data);
      },
      complete: () => {
        console.log('end of request');
      }
    });
  }

  ngOnInit(): void {
  }

  test(): void {
    console.log(this.articles);
    console.log(this.articles[0]);
    
    /*this.newsService.getNews().subscribe({
      next: (data: any) => {
        console.log('woah, got something');
        console.log(data);
      },
      error: data => {
        console.log('error');
        console.log(data);
      },
      complete: () => {
        console.log('end of request');
      }
    });*/
  }
}
