import { ActionContext } from 'vuex';

export interface AppState {
    wip: boolean;
    tasks: Task[];
    newTaskText: string;
}

export interface Task {
    id: string;
    text: string;
}

export type AppStateActionContext = ActionContext<AppState, AppState>;
