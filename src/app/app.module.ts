import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TodolistComponent} from './home-page/todolist/todolist.component';
import {TaskComponent} from './home-page/task/task.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AddNewItemFormComponent} from './home-page/add-new-item-form/add-new-item-form.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {TailSpinLoaderComponent} from './shared/components/tail-spin-loader/tail-spin-loader.component';
import {TodoFooterComponent} from './home-page/todo-footer/todo-footer.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TaskPageComponent} from './task-page/task-page.component';
import {LoginPageComponent} from './login-page/login-page.component';

@NgModule({
    declarations: [
        AppComponent,
        TodolistComponent,
        TaskComponent,
        HomePageComponent,
        AddNewItemFormComponent,
        LoaderComponent,
        TailSpinLoaderComponent,
        TodoFooterComponent,
        PageNotFoundComponent,
        TaskPageComponent,
        LoginPageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
