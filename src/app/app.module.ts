import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BetListComponent } from './bet-list/bet-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BetGroupService } from './services/BetGroupService';

@NgModule({
  declarations: [
    AppComponent,
    BetListComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    BetGroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
