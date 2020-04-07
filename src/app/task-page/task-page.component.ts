import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITaskResponse, TaskService} from '../shared/services/task.service';
import {ActivatedRoute} from '@angular/router';
import {ITask} from '../home-page/todolist/todolist.component';
import {concatMap, find} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-task-page',
    templateUrl: './task-page.component.html',
    styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit, OnDestroy {

    task: ITask;
    isLoading = false;

    subscriptions: Subscription = new Subscription();

    constructor(
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        const taskId = this.activatedRoute.snapshot.paramMap.get('id');
        const todolistId = this.activatedRoute.snapshot.paramMap.get('todolistId');
        this.getTaskById(taskId, todolistId);
    }

    getTaskById(taskId, todolistId) {
        this.isLoading = true;
        this.subscriptions.add(this.taskService.getTasks(todolistId)
            .pipe(
                concatMap((res: ITaskResponse) => res.items),
                find((task: ITask) => task.id === taskId)
            )
            .subscribe((task) => {
                this.task = task;
                this.isLoading = false;
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
