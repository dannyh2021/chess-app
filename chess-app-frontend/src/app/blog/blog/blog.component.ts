import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogposts: any = [];
  likes: any = [];

  constructor(public accountService: AccountService) {
    this.getBlogPosts();
  }

  ngOnInit(): void {
  }

  getBlogPosts() {
    this.accountService.getBlog().subscribe({
      next: (data: any) => {
        console.log(data);
        this.blogposts = data;
        //console.log(this.cookieService.getAll());
        // this.router.navigate(['/']);
        this.blogposts.sort((a: any, b: any) => {
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
        });
      }, error: data => {
        console.log('error: ', data.error);
        // console.error(error);
      }, complete: () => {
        // when does this complete run?
        this.blogposts.sort((a: any, b: any) => {
          return (a.date.localeCompare(b.date));
        });
        this.blogposts.reverse();
      }
    });
  }
}