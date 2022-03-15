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
  @Output() postChange: EventEmitter<null> = new EventEmitter<null>();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  canDelete(): boolean {
    return this.accountService.getUsername() === this.post.author;
  }

  deletePost(): void {
    this.accountService.deleteBlog(this.post._id).subscribe({
      next: (data: any) => {
        console.log('successfully deleted post, ', data);
        this.postChange.emit();
      },
      error: data => {
        console.log('error: ', data.error);
      }
    });
  }
}
