import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { NewsComponent } from './news/news/news.component';
import { GameComponent } from './game/game/game.component';
import { MatchInfoComponent } from './game/match-info/match-info.component';
import { ChatComponent } from './game/chat/chat.component';
import { ControllerComponent } from './game/controller/controller.component';
import { BoardComponent } from './game/board/board.component';

import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './services/account.service';

import { FormsModule } from '@angular/forms';
import { ForumsComponent } from './forums/forums/forums.component';
import { ForumComponent } from './forums/forum/forum.component';

import { NgxChessBoardModule } from 'ngx-chess-board';

import { CookieService } from 'ngx-cookie-service';
import { ArticleComponent } from './news/article/article.component';
import { BlogComponent } from './blog/blog/blog.component';
import { BlogpostComponent } from './blog/blogpost/blogpost.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'play', component: GameComponent },
  { path: 'news', component: NewsComponent },
  { path: 'forum' , component: ForumsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo:'/play', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    NotFoundComponent,
    SignUpComponent,
    PasswordResetComponent,
    NewsComponent,
    GameComponent,
    MatchInfoComponent,
    ChatComponent,
    ControllerComponent,
    BoardComponent,
    BlogComponent,
    ForumsComponent,
    ForumComponent,
    ArticleComponent,
    BlogpostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxChessBoardModule.forRoot()
  ],
  providers: [AccountService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
