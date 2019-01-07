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
                     droppable
                     (onDrop)="move(status, $event.dragData)"
                     dragHintClass="drag-hint"
                     dragOverClass="drag-over">
                    <div class="box" 
                         *ngFor="let task of tasksWithStatus(status)" 
                         draggable 
                         [dragData]="task" 
                         dragClass="drag" 
                         dragTransitClass="drag-transit">
                        <span class="tag is-primary">{{task.id}}</span>
                        {{task.text}}
                        <span class="tag is-warning">{{task.status}}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        '.drag {background-color: yellow;}',
        '.drag-transit {background-color: pink;}',
        '.drag-hint {outline:1px solid lightgrey;}',
        '.drag-over {outline:1px solid fuchsia;}'
    ]
})
export class NgdragdropExperimentComponent {
    private tasks: Task[] = [
        new Task('1', 'Task one', 'todo'),
        new Task('2', 'Task two', 'todo'),
        new Task('3', 'Task three', 'todo'),
        new Task('4', 'Task four', 'in-progress')
    ];

    tasksWithStatus(status: TaskStatus) {
        return this.tasks.filter(task => task.status === status);
    }

    move(toStatus: TaskStatus, task: Task) {
        console.log(`drop ${task.id} to ${toStatus}`);
        task.status = toStatus;
    }
}
