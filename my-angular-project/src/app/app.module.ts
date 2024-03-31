import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { GivesModule } from './giveAway/gives.module';
import { UserModule } from './user/user/user.module';
import { appInterceptorProvider } from './api.interceptor';
import { EditComponent } from './giveAway/edit/edit.component';
import { DetailsComponent } from './giveAway/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    GivesModule,
    UserModule,
  ],
  providers: [appInterceptorProvider],

  bootstrap: [AppComponent]
})

export class AppModule { }