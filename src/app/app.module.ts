import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TodolistComponent} from './todolist/todolist.component';
import {TaskComponent} from './task/task.component';
import {HomeComponent} from './home/home.component';
import {AddNewItemFormComponent} from './add-new-item-form/add-new-item-form.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {TailSpinLoaderComponent} from './shared/components/tail-spin-loader/tail-spin-loader.component';
import {TodoFooterComponent} from './todo-footer/todo-footer.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TaskPageComponent} from './task-page/task-page.component';

@NgModule({
    declarations: [
        AppComponent,
        TodolistComponent,
        TaskComponent,
        HomeComponent,
        AddNewItemFormComponent,
        LoaderComponent,
        TailSpinLoaderComponent,
        TodoFooterComponent,
        PageNotFoundComponent,
        TaskPageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
