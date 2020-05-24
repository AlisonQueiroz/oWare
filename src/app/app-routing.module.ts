import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';


const routes: Routes = [
  { path: 'login', component: NgxAuthFirebaseUIModule},
  { path: 'ware-items', component: ItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
