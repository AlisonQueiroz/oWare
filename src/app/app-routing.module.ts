import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './pages/items/items.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'ware-items', component: ItemsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
