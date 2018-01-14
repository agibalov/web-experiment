import {Component} from '@angular/core';

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
                <div class="column"
                     droppable
                     (onDrop)="move('todo', $event.dragData)"
                     dragHintClass="drag-hint"
                     dragOverClass="drag-over">
                    <div class="box" 
                         *ngFor="let task of tasksWithStatus('todo')" 
                         draggable 
                         [dragData]="task" 
                         dragClass="drag" 
                         dragTransitClass="drag-transit">{{task.id}} {{task.text}} {{task.status}}</div>
                </div>
                <div class="column" 
                     droppable 
                     (onDrop)="move('in-progress', $event.dragData)"
                     dragHintClass="drag-hint"
                     dragOverClass="drag-over">
                    <div class="box"
                         *ngFor="let task of tasksWithStatus('in-progress')"
                         draggable
                         [dragData]="task"
                         dragClass="drag"
                         dragTransitClass="drag-transit">{{task.id}} {{task.text}} {{task.status}}</div>
                </div>
                <div class="column"
                     droppable
                     (onDrop)="move('done', $event.dragData)"
                     dragHintClass="drag-hint"
                     dragOverClass="drag-over">
                    <div class="box"
                         *ngFor="let task of tasksWithStatus('done')"
                         draggable
                         [dragData]="task"
                         dragClass="drag"
                         dragTransitClass="drag-transit">{{task.id}} {{task.text}} {{task.status}}</div>
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

    constructor() {
    }

    tasksWithStatus(status: 'todo'|'in-progress'|'done') {
        return this.tasks.filter(task => task.status === status);
    }

    move(toStatus: 'todo'|'in-progress'|'done', task: Task) {
        console.log(`drop ${task.id} to ${toStatus}`);
        task.status = toStatus;
    }
}
