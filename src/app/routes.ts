import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { BetListComponent } from './bet/bet-list/bet-list.component';
import { CompetitionComponent } from './competition/competition.component';
import { HistoryComponent } from './backoffice/history/history.component';
import { ShowbetComponent } from './showbet/showbet.component';
import { CcComponent } from './backoffice/cc/cc.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { UpdateProfileComponent } from './backoffice/update-profile/update-profile.component';

export const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent },
    { path: 'home', component: HomeComponent, 
        children: [
            { path: 'sport', component: CompetitionComponent }
        ] 
    },
    // {
    //     path: 'signup', component: UserComponent,
    //     children: [{ path: '', component: SignUpComponent }]
    // },
    // {
    //     path: 'login', component: UserComponent,
    //     children: [{ path: '', component: SignInComponent }]
    // },
    { path: '', redirectTo:'/home', pathMatch : 'full' },
    { path: 'profile', component: BackofficeComponent, canActivate:[AuthGuard] ,
        children: [
            { path: 'cagnotte', component: CcComponent, canActivate:[AuthGuard] },
            { path: 'history', component: HistoryComponent, canActivate:[AuthGuard] },
            { path: 'update-profile', component: UpdateProfileComponent, canActivate:[AuthGuard] }
        ]
    },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: SignInComponent },

    // { path: 'historical', component: HistoricalComponent },
    
    {   
        path: 'football', component: HomeComponent,
        children: [
            { path: 'competition/:id', component: ShowbetComponent }
             ,
             { path: 'bets/match/:id', component: BetListComponent }
        ]
    },
    { path: 'basketball', component: HomeComponent }
];