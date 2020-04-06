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

@NgModule({
    declarations: [
        AppComponent,
        TodolistComponent,
        TaskComponent,
        HomeComponent,
        AddNewItemFormComponent,
        LoaderComponent,
        TailSpinLoaderComponent,
        TodoFooterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
