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

import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './services/account.service';

import { NgxChessBoardModule } from 'ngx-chess-board';

import { CookieService } from 'ngx-cookie-service';
import { ArticleComponent } from './news/article/article.component';
import { BlogComponent } from './blog/blog/blog.component';
import { BlogpostComponent } from './blog/blogpost/blogpost.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateBlogpostComponent } from './blog/create-blogpost/create-blogpost.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { GameVisualizerComponent } from './game-visualizer/game-visualizer.component';

import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'play', component: GameComponent },
  { path: 'news', component: NewsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/create', component: CreateBlogpostComponent },
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
    BlogComponent,
    ArticleComponent,
    BlogpostComponent,
    ProfileComponent,
    CreateBlogpostComponent,
    GameVisualizerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxChessBoardModule.forRoot(),
    AngularEditorModule
  ],
  providers: [AccountService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
