import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { BetListComponent } from './bet/bet-list/bet-list.component';
import { CompetitionComponent } from './competition/competition.component';
import { HistoryComponent } from './history/history.component';
import { ShowbetComponent } from './showbet/showbet.component';

export const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent },
    { path: 'home', component: HomeComponent, 
        children: [
            { path: 'sport', component: CompetitionComponent },
            { path: 'history', component: HistoryComponent }
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
    { path: 'back-office', component: HomeComponent, canActivate:[AuthGuard] },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: SignInComponent },

    // { path: 'historical', component: HistoricalComponent },
    
    {   
        path: 'football', component: HomeComponent,
        children: [
            { path: 'competition/1', component: ShowbetComponent }, 
            { path: 'competition/2',  redirectTo:'/home', pathMatch : 'full' }
             ,
             { path: 'bets/match/:id', component: BetListComponent }
        ]
    },
    { path: 'basketball', component: HomeComponent }
];