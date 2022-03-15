import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AccountService } from 'src/app/services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-blogpost',
  templateUrl: './create-blogpost.component.html',
  styleUrls: ['./create-blogpost.component.css']
})
export class CreateBlogpostComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '300px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Inconsolata',
      defaultFontSize: '12',
      fonts: [
        {class: 'Inconsolata', name: 'Inconsolata' },
      ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      //['bold', 'italic'],
      ['fontSize'],
      ['outdent'],
      ['heading', 'textColor', 'backgroundColor'],
      ['link', 'unlink', 'insertImage', 'insertVideo', 'insertHorizontalRule', 'removeFormat', 'toggleEditorMode']
    ]
  };
  games: any = {};
  text: string = 'hi';

  constructor(private accountService: AccountService) {
    this.updateGames();
  }

  ngOnInit(): void {
  }

  updateGames(): void {
    this.accountService.getGames(this.accountService.getUsername()).subscribe({
      next: (data: any) => {
        console.log('wow it worked');
        console.log(data);
        this.games = data.games;
      }, error: data => {
        console.log('error:', data.error);
        // console.error(error);
      }, complete: () => {
        // when does this complete run?
        console.log('accountService login completed');
      }
    });
  }
  
  createPost(f: NgForm): void {
    console.log('hi');
    console.log(f.value);
    console.log(this.text);
  }
}