import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TaskPageComponent} from './task-page/task-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthGuard} from './shared/guards/auth.guard';

const appRoutes: Routes = [
    {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'task/:id/:todolistId', component: TaskPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
