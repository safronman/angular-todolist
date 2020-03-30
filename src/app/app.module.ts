import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TodolistComponent} from './todolist/todolist.component';
import {TaskComponent} from './task/task.component';
import {HomeComponent} from './home/home.component';
import {AddNewItemFormComponent} from './add-new-item-form/add-new-item-form.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        TodolistComponent,
        TaskComponent,
        HomeComponent,
        AddNewItemFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
