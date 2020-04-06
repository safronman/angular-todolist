import {Component, OnInit} from '@angular/core';
import {ITaskResponse, TaskService} from '../shared/services/task.service';
import {ActivatedRoute} from '@angular/router';
import {ITask} from '../todolist/todolist.component';
import {concatMap, find} from 'rxjs/operators';

@Component({
    selector: 'app-task-page',
    templateUrl: './task-page.component.html',
    styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

    task: ITask;
    isLoading = false;

    constructor(
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isLoading = true;
        const taskId = this.activatedRoute.snapshot.paramMap.get('id');
        const todolistId = this.activatedRoute.snapshot.paramMap.get('todolistId');
        this.taskService.getTasks(todolistId)
            .pipe(
                concatMap((res: ITaskResponse) => res.items),
                find((task: ITask) => task.id === taskId)
            )
            .subscribe((task) => {
                this.task = task;
                this.isLoading = false;
            });

    }

}
