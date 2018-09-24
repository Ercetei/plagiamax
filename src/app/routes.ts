import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
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
import { AdminComponent } from "./backoffice/admin/admin.component";

export const appRoutes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: '', component: ShowbetComponent },
            { path: 'sport', component: CompetitionComponent }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'profile', component: BackofficeComponent, canActivate: [AuthGuard],
        children: [
            { path: 'cagnotte', component: CcComponent, canActivate: [AuthGuard] },
            { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
            { path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
            { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: SignInComponent },
    {
        path: 'football', component: HomeComponent,
        children: [
            { path: 'competition/:id', component: ShowbetComponent },
            { path: 'match/:id', component: BetListComponent }
        ]
    },
    { path: 'basketball', component: HomeComponent }
];
