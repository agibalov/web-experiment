import {Component} from '@angular/core';
import {DragulaService} from "ng2-dragula";

class Task {
    constructor(
        public id: string,
        public text: string,
        public status: 'todo'|'in-progress'|'done')
    {}
}

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
                <div class="column" [dragula]="'todo-bag'" [dragulaModel]="tasks">
                    <div class="box" 
                         *ngFor="let task of tasks" 
                         [id]="task.id">{{task.id}} {{task.text}} {{task.status}}</div>
                </div>
                <div class="column" [dragula]="'in-progress-bag'">
                </div>
                <div class="column" [dragula]="'done-bag'">
                </div>
            </div>
        </div>
    `,
    styles: [
        '.gu-transit { background-color: yellow; }',
        '.gu-mirror { background-color: pink; }'
    ]
})
export class DragulaExperimentComponent {
    tasks: Task[] = [
        new Task('1', 'Task one', 'todo'),
        new Task('2', 'Task two', 'todo'),
        new Task('3', 'Task three', 'todo'),
        new Task('4', 'Task four', 'in-progress')
    ];

    constructor(private dragulaService: DragulaService) {
        this.dragulaService.drag.subscribe(value => {
            const bag = value[0];
            const taskId = value[1].id;
            console.log('drag', bag, taskId);
        });

        this.dragulaService.drop.subscribe(value => {
            const bag = value[0];
            const taskId = value[1].id;
            console.log('drop', bag, taskId, this.tasks.map(t => t.id));
        });

        this.dragulaService.over.subscribe(value => {
            const bag = value[0];
            const taskId = value[1].id;
            console.log('over', bag, taskId);
        });

        this.dragulaService.out.subscribe(value => {
            const bag = value[0];
            const taskId = value[1].id;
            console.log('out', bag, taskId);
        });
    }
}
