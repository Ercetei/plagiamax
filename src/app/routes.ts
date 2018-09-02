import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { BetListComponent } from './bet-list/bet-list.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
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
    { path: 'match-bet', component: BetListComponent, outlet: 'container' },
    {   
        path: '', component: HomeComponent,
        children: [{ path: 'match-bet/:id', component: BetListComponent }] 
    }
];