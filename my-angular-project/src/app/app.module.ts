import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { CatalogComponent } from './giveAway/catalog/catalog.component';
// !
import { EditComponent } from './giveAway/edit/edit.component';
import { DetailsComponent } from './giveAway/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatalogComponent
  ],
// !
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CatalogComponent,
    EditComponent,
    DetailsComponent
  ],
  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }