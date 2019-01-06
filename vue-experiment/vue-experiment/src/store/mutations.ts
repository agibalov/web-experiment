import { MutationTree } from 'vuex';
import { AppState, Task } from '@/store/state';

// TODO: this sucks - how do I avoid all this duplication and use normal statically-typed functions instead?
export const SET_WIP = 'setWip';
export const SET_TASKS = 'setTasks';
export const SET_NEW_TASK_TEXT = 'setNewTaskText';

export const mutations: MutationTree<AppState> = {
    [SET_WIP](state, isWip: boolean) {
        state.wip = isWip;
    },
    [SET_TASKS](state, tasks: Task[]) {
        state.tasks = tasks;
    },
    [SET_NEW_TASK_TEXT](state, text: string) {
        state.newTaskText = text;
    },
};
