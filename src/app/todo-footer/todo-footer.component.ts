import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITask} from '../todolist/todolist.component';
import {TaskStatus} from '../shared/enums/enums';
import {ITodo} from '../home/home.component';

@Component({
    selector: 'app-todo-footer',
    templateUrl: './todo-footer.component.html',
    styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

    @Input() tasks: ITask[] = [];
    @Input() todolist: ITodo;
    @Input() filteredValue: TaskStatus.All | TaskStatus.Active | TaskStatus.Completed;
    @Output() filterTasks = new EventEmitter<string>();
    @Output() clearCompletedTasks = new EventEmitter<string>();

    TaskStatus = TaskStatus;

    constructor() {
    }

    ngOnInit() {
    }

    changeFilterValue(value) {
        this.filterTasks.emit(value);
    }

    getActiveTasks() {
        const activeTasks = this.tasks.filter((t) => {
            return t.status === 0;
        });
        return activeTasks.length;
    }

    clearCompleted() {
        this.tasks.forEach((t) => {
            if (t.status === 2) {
                this.clearCompletedTasks.emit(t.id);
            }
        });
    }
}
