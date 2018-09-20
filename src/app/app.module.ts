import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { BetService } from './shared/services/bet.service';
import { UserService } from './shared/services/user.service';
import { MatchService } from './shared/services/match.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { BetListComponent } from './bet/bet-list/bet-list.component';
import { BetSelectedComponent } from './bet/bet-selected/bet-selected.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { CcComponent } from './cc/cc.component';
import { CompetitionComponent } from './competition/competition.component';
import { HistoryComponent } from './history/history.component';
import { HistoryService } from './shared/services/history.service';
import { GeneralService } from './shared/services/general.service';
import { CookieService } from 'ngx-cookie-service';
import { ShowbetComponent } from './showbet/showbet.component';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { CreditCardService } from './cc/services/creditCard-service';
import { ReactiveFormsModule } from '@angular/forms';
import { IgxDatePickerModule, IgxMaskModule } from 'igniteui-angular';
import { AngularFireLite } from 'angularfire-lite';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    ShowbetComponent,
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CcComponent,
    BetSelectedComponent,
    BetListComponent,
    CompetitionComponent,
    HistoryComponent,
    ShowbetComponent
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
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    IgxDatePickerModule, IgxMaskModule
  ],

  providers: [UserService, GeneralService, HistoryService, BetService, MatchService, AuthGuard, CreditCardService,
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
