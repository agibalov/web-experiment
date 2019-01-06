import { ActionTree } from 'vuex';
import { AppState, AppStateActionContext, Task } from '@/store/state';
import { DataAccessService, TaskDto } from '@/data-access-service';
import { SET_TASKS, SET_WIP } from '@/store/mutations';

// TODO: this sucks - how do I avoid all this duplication and use normal statically-typed functions instead?
export const LOAD_TASKS = 'loadTasks';
export const PUT_TASK = 'putTask';
export const DELETE_TASK = 'deleteTask';

const dataAccessService = new DataAccessService();

async function executeWithWip<TResult>(
    context: AppStateActionContext,
    f: () => TResult): Promise<TResult> {

    context.commit(SET_WIP, true);
    try {
        return await f();
    } finally {
        context.commit(SET_WIP, false);
    }
}

async function loadTasksImpl(context: AppStateActionContext) {
    const taskDtos = await dataAccessService.getTasks();
    const tasks: Task[] = taskDtos.map((t) => ({
        id: t.id,
        text: t.text,
    }));
    context.commit(SET_TASKS, tasks);
}

export const actions: ActionTree<AppState, AppState> = {
    async [LOAD_TASKS](context: AppStateActionContext) {
        return executeWithWip(context, async () => {
            await loadTasksImpl(context);
        });
    },
    async [PUT_TASK](context: AppStateActionContext, task: Task) {
        return executeWithWip(context, async () => {
            const taskDto: TaskDto = {
                id: task.id,
                text: task.text,
            };
            await dataAccessService.putTask(taskDto);
            await loadTasksImpl(context);
        });
    },
    async [DELETE_TASK](context: AppStateActionContext, taskId: string) {
        return executeWithWip(context, async () => {
            await dataAccessService.deleteTask(taskId);
            await loadTasksImpl(context);
        });
    },
};
