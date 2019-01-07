import {Component} from '@angular/core';
import {Task, TaskStatus} from "./task";

@Component({
    template: `
        <div class="container">
            <div class="columns">
                <div class="column">
                    <h1 class="title is-4">To Do</h1>
                </div>
                <div class="column">
                    <h1 class="title is-4">In Progress</h1>
                </div>
                <div class="column">
                    <h1 class="title is-4">Done</h1>
                </div>
            </div>
            <div class="columns">
                <div class="column"
                     *ngFor="let status of ['todo', 'in-progress', 'done']"
                     ngxDroppable="singletonDropZone"
                     (drag)="drag(status, $event.el.id)"
                     (drop)="drop(status, $event.el.id)">
                    <div class="box" 
                         *ngFor="let task of tasksWithStatus(status)" 
                         [id]="task.id"
                         ngxDraggable>
                        <span class="tag is-primary">{{task.id}}</span>
                        {{task.text}}
                        <span class="tag is-warning">{{task.status}}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        '.gu-transit { background-color: yellow; }',
        '.gu-mirror { background-color: pink; }'
    ]
})
export class NgxDndComponent {
    private tasks: Task[] = [
        new Task('1', 'Task one', 'todo'),
        new Task('2', 'Task two', 'todo'),
        new Task('3', 'Task three', 'todo'),
        new Task('4', 'Task four', 'in-progress')
    ];

    tasksWithStatus(status: TaskStatus) {
        return this.tasks.filter(task => task.status === status);
    }

    drag(status: TaskStatus, taskId: string) {
        console.log(`drag ${taskId} from ${status}`);
    }

    drop(status: TaskStatus, taskId: string) {
        console.log(`drop ${taskId} to ${status}`);
        this.tasks.filter(task => task.id === taskId)[0].status = status;
    }
}
