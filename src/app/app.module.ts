import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RequestItemDialogComponent } from './pages/warehouse/request-item-dialog/request-item-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { ItemsComponent } from './pages/warehouse/items/items.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { SetupComponent } from './pages/setup/setup.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../environments/environment';
import { MaterialModule } from './Shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    LoginComponent,
    SidebarComponent,
    SetupComponent,
    RequestItemDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AkitaNgRouterStoreModule,
    environment.production ? [] : AkitaNgDevtools,
    NgxAuthFirebaseUIModule
      .forRoot(
        environment.firebase,
        () => 'owarehouse', {
          authGuardFallbackURL: 'login',
          authGuardLoggedInURL: 'ware-items',
        }
      ),
    AngularFireModule.initializeApp(environment.firebase),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    AngularFirestore,
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
