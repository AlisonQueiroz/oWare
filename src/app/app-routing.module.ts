import { LoginComponent } from './pages/login/login.component';
import { ItemsComponent } from './pages/items/items.component';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ware-items', component: ItemsComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
