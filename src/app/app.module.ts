import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { BetTypeService } from './shared/services/bet-type.service';
import { UserService } from './shared/services/user.service';
import { MatchService } from './shared/services/match.service';
import { MatchBetService } from './shared/services/match-bet.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { BetListComponent } from './bet/bet-list/bet-list.component';
import { BetSelectedComponent } from './side-panel/bet-selected/bet-selected.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { ShowbetComponent } from './showbet/showbet.component';
import { CompetitionComponent } from './competition/competition.component';

import { HistoryComponent } from './history/history.component';
import { HistoryService } from './shared/services/history.service';

import { CookieService } from 'ngx-cookie-service';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireLite } from 'angularfire-lite';
import { environment } from '../environments/environment';
import { BaseService } from './shared/services/base.service';


@NgModule({
  declarations: [
    AppComponent,
    BetListComponent,
    BetSelectedComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CompetitionComponent,
    HistoryComponent,
    ShowbetComponent,
    SidePanelComponent
  ],
  imports: [
    BrowserModule,
    AngularFireLite.forRoot(environment.config),
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    AngularFontAwesomeModule
  ],
  providers: [UserService, HistoryService, BetTypeService, MatchBetService, MatchService, BaseService, AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    CookieService,
    NgbAlertConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
