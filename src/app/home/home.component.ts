import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodolistService} from '../shared/services/todolist.service';
import {Subscription} from 'rxjs';
import {IChangeTodoTitle} from '../todolist/todolist.component';

export interface ITodo {
    id: string;
    addedDate: string;
    order: number;
    title: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    todolists: Array<ITodo> = [];
    isTodolistsLoaded = false;
    loading = false;
    isTodolists = false;

    subscriptions: Subscription = new Subscription();

    constructor(private todolistService: TodolistService) {
    }

    ngOnInit() {
        this.isTodolistsLoaded = false;
        this.subscriptions.add(this.todolistService.getTodolists()
            .subscribe((res) => {
                if (res.length === 0) {
                    this.isTodolists = false;
                    this.isTodolistsLoaded = true;
                } else {
                    this.isTodolists = true;
                    this.todolists = res;
                    this.isTodolistsLoaded = true;
                }
            }));
    }

    addTodolist(value: string) {
        this.loading = true;
        this.subscriptions.add(this.todolistService.addTodolist(value)
            .subscribe((res) => {
                this.isTodolists = true;
                this.todolists.unshift(res.data.item);
                this.loading = false;
            }));
    }

    deleteTodolist(todolistId: string) {
        this.loading = true;
        this.subscriptions.add(this.todolistService.deleteTodolist(todolistId)
            .subscribe((res) => {
                this.todolists = this.todolists.filter((tl) => {
                    return tl.id !== todolistId;
                });
                if (this.todolists.length === 0) {
                    this.isTodolists = false;
                }
                this.loading = false;
            }));
    }

    changeTodolistTitle(data: IChangeTodoTitle) {
        this.loading = true;
        const {todolistTitle, todolistId} = data;
        this.subscriptions.add(this.todolistService.updateTodolistTitle(todolistTitle, todolistId)
            .subscribe((res) => {
                this.loading = false;
            }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
