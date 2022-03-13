import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  @Input() post: any = {
    title: 'default blog',
    author: 'default author name',
    date: new Date,
    likes: 68,
    img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/chess-art-justyna-jbjart.jpg',
    pgn: '1. e4 Nf6 2. d4 Nxe4 3. c4 Nc6 4. d5 Nb4 5. c5 Nxc5 6. a3 Nbd3+ 7. Bxd3 e6 8. b4 Qf6 9. dxe6 Nxd3+ 10. Qxd3 Qxa1',
    text: 'Hello, testing'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
