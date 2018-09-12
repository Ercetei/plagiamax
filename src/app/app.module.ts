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
<<<<<<< HEAD
import { ShowbetComponent } from './showbet/showbet.component';
import { NgModule } from '@angular/core';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { CcComponent } from './cc/cc.component';
=======
import { CookieService } from 'ngx-cookie-service';
>>>>>>> 751edee3033de19f4219750b5087e66ee2f94ef3


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
    ShowbetComponent,
    CreditCardComponent,
    CcComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [UserService, BetService, MatchService, AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
