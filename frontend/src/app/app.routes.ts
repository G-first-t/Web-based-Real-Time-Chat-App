import { Routes } from '@angular/router';
import {LoginComponent} from './pages/Login/login.component';
import {SignupComponent} from './pages/SignUp/signup.component';
import {ChatComponent} from './pages/chatting/chat.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'chat', component: ChatComponent }
];
