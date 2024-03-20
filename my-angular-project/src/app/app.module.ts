import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { CatalogComponent } from './catalog/catalog.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatalogComponent,
    EditComponent,
    DetailsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule

  ],
  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }