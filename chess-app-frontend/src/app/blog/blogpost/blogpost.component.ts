import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  @Input() post: any = {
    _id: 314159,
    title: 'default blog',
    author: 'default author name',
    date: new Date,
    pgn: '1. e4 Nf6 2. d4 Nxe4 3. c4 Nc6 4. d5 Nb4 5. c5 Nxc5 6. a3 Nbd3+ 7. Bxd3 e6 8. b4 Qf6 9. dxe6 Nxd3+ 10. Qxd3 Qxa1',
    text: '<em>testing</em>'
  };
  likes: any[] = [];
  @Output() postChange: EventEmitter<null> = new EventEmitter<null>();

  constructor(public accountService: AccountService) {
    this.getPostLikes();
  }

  ngOnInit(): void {
  }

  canDelete(): boolean {
    return this.accountService.getUsername() === this.post.author;
  }

  deletePost(): void {
    this.accountService.deleteBlog(this.post._id).subscribe({
      next: (data: any) => {
        //console.log('successfully deleted post, ', data);
        this.postChange.emit();
      },
      error: data => {
        console.log('error: ', data.error);
      }
    });
  }

  likePost(): void {
    this.accountService.likePost(this.accountService.getUsername(), this.post._id).subscribe({
      next: (data: any) => {
        // console.log('liked');
      }, error: data => {
        console.log('error: ',data.error);
      }, complete: () => {
        // console.log('likePost completed');
        this.getPostLikes();
      }
    });
  }

  unlikePost(): void {
    if(!this.liked()) {
      alert('you have not liked this post');
    } else {
      let like_id = '';
      for (let i = 0; i < this.likes.length; i++) {
        if (this.likes[i]['username'] === this.accountService.getUsername()) {
          like_id = this.likes[i]['_id'];
          break;
        }
      }

      this.accountService.unlikePost(like_id).subscribe({
        next: (data: any) => {
          // console.log('unliked');
        }, error: data => {
          console.log('error: ',data.error);
        }, complete: () => {
          // console.log('unlikePost completed');
          this.getPostLikes();
        }
      });
    }
  }

  getPostLikes() {
    this.accountService.getLikes().subscribe({
      next: (data: any) => {
        this.likes = [];
        for (let i = 0; i < data.length; i++) {
          if (this.post._id === data[i]['post_id']) {
            this.likes.push(data[i]);
          }
        }
      }, error: data => {
        console.log('likes error: ', data);
      }, complete: () => {
        // console.log('likes: ', this.likes.length);
      }
    });
  }

  // checks if the user already liked the post
  liked(): boolean {
    return this.likes.some(like => like.username === this.accountService.getUsername());
  }
}
