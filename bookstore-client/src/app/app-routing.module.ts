import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {BooksComponent} from './books/books.component';
import {BookComponent} from './books/book/book.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {LoggedInGuard} from './authentication/logged-in.guard';
import {AdminGuard} from "./authentication/admin.guard";
import {SignupComponent} from "./signup/signup.component";

const booksRoutes: Routes = [
  {path: ':id', component: BookComponent}
];

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ AdminGuard  ]
  },
  {path: 'books', component: BooksComponent,
    canActivate: [ LoggedInGuard ],
    children: booksRoutes
  },
  { path: 'signup', component: SignupComponent },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
