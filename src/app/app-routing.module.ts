import { NgModule } from '@angular/core';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ItemsComponent } from './pages/warehouse/items/items.component';


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
