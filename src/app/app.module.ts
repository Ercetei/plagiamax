import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { BetTypeService } from './shared/services/bet-type.service';
import { UserService } from './shared/services/user.service';
import { BetService } from './shared/services/bet.service';
import { BetLineService } from './shared/services/bet-line.service';
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
import { FooterComponent } from './footer/footer.component';
import { CcComponent } from './backoffice/cc/cc.component';
import { CompetitionComponent } from './competition/competition.component';
import { HistoryComponent } from './backoffice/history/history.component';
import { HistoryService } from './shared/services/history.service';
import { CookieService } from 'ngx-cookie-service';
import { ShowbetComponent } from './showbet/showbet.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { CreditCardService } from './backoffice/cc/services/creditCard-service';
import { ReactiveFormsModule } from '@angular/forms';
import { IgxDatePickerModule, IgxMaskModule } from 'igniteui-angular';
import { AngularFireLite } from 'angularfire-lite';
import { environment } from '../environments/environment';
import { BaseService } from './shared/services/base.service';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { UpdateProfileComponent } from './backoffice/update-profile/update-profile.component';
import { AdminComponent } from './backoffice/admin/admin.component';
import { ScoreFormComponent } from './backoffice/admin/scoreform/scoreform.component';
import { BetdetailsComponent } from './backoffice/history/betdetails/betdetails.component';
import { CustomMinDirective } from './shared/validators/custom-min.validator';

@NgModule({
  declarations: [
    ShowbetComponent,
    AppComponent,
    BetListComponent,
    BetSelectedComponent,
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
    ShowbetComponent,
    SidePanelComponent,
    BackofficeComponent,
    UpdateProfileComponent,
    AdminComponent,
    ScoreFormComponent,
    BetdetailsComponent,
    CustomMinDirective
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
    IgxDatePickerModule, IgxMaskModule,
  ],
  providers: [UserService, HistoryService, BetTypeService, BetService, BetLineService, MatchBetService, BaseService, AuthGuard,  CreditCardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CookieService,
    NgbAlertConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
