import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ITodo} from '../home-page.component';
import {TaskService} from '../../shared/services/task.service';
import {Subscription} from 'rxjs';
import {TaskStatus} from '../../shared/enums/enums';

export interface ITask {
    description: string;
    title: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
}

export interface IChangeTodoTitle {
    todolistTitle: string;
    todolistId: string;
}

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {

    @Input() todolist: ITodo;
    @Output() deleteTodo = new EventEmitter<string>();
    @Output() changeTodoTitle = new EventEmitter<IChangeTodoTitle>();

    tasks: Array<ITask> = [];
    editTitleMode = false;
    taskLoading = false;
    isTasks = false;

    filteredValue = TaskStatus.All;

    subscriptions: Subscription = new Subscription();

    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.getTasks();
    }

    getTasks() {
        this.taskLoading = true;
        this.subscriptions.add(this.taskService.getTasks(this.todolist.id)
            .subscribe((res) => {
                if (res.items.length === 0) {
                    this.isTasks = false;
                    this.taskLoading = false;
                } else {
                    this.isTasks = true;
                    this.tasks = res.items;
                    this.taskLoading = false;
                }
            }));
    }

    onDeleteTodolistClick(todolistId) {
        this.deleteTodo.emit(todolistId);
    }

    changeTitle() {
        this.editTitleMode = true;
    }

    onBlurTodolistTitle(todolistId) {
        this.changeTodoTitle.emit({todolistTitle: this.todolist.title, todolistId});
        this.editTitleMode = false;
    }

    addTask(title) {
        this.taskLoading = true;
        this.subscriptions.add(this.taskService.addTask(this.todolist.id, title)
            .subscribe((res) => {
                this.isTasks = true;
                this.tasks.unshift(res.data.item);
                this.taskLoading = false;
            }));
    }

    deleteTask(taskId) {
        this.taskLoading = true;
        this.subscriptions.add(this.taskService.deleteTask(this.todolist.id, taskId)
            .subscribe((res) => {
                this.tasks = this.tasks.filter((t) => {
                    return t.id !== taskId;
                });
                if (this.tasks.length === 0) {
                    this.isTasks = false;
                }
                this.taskLoading = false;
            }));
    }

    changeTask(task: ITask) {
        this.taskLoading = true;
        this.subscriptions.add(this.taskService.updateTask(task.todoListId, task.id, task)
            .subscribe((res) => {
                this.taskLoading = false;
            }));
    }

    getFilteredTasks(value) {
        this.filteredValue = value;
        switch (this.filteredValue) {
            case TaskStatus.All: {
                return this.tasks;
            }

            case TaskStatus.Completed: {
                return this.tasks.filter((t) => {
                    return t.status === 2;
                });
            }

            case TaskStatus.Active: {
                return this.tasks.filter((t) => {
                    return t.status === 0;
                });
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
