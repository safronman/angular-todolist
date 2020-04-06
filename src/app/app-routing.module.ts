import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TaskPageComponent} from './task-page/task-page.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'task/:id/:todolistId', component: TaskPageComponent},
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
