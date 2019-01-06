<template>
    <div class="content">
        <p>There are {{$store.state.tasks.length}} tasks</p>

        <form @submit.prevent="handleAddTask()">
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="text" name="text" placeholder="Put text here"
                           :value="$store.state.newTaskText"
                           @input="updateNewTaskText($event)"
                           v-validate.immediate="'required'">
                </div>
                <div class="control">
                    <button type="submit" class="button" :disabled="errors.any()">Add</button>
                </div>
            </div>
        </form>

        <TaskListItem v-for="task in $store.state.tasks"
                      :key="task.id"
                      :task="task"
                      @delete-task="handleDeleteTask($event) "/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import TaskListItem from '@/components/TaskListItem.vue';
    import { Task } from '@/store/state';
    import { DELETE_TASK, LOAD_TASKS, PUT_TASK } from '@/store/actions';
    import { SET_NEW_TASK_TEXT } from '@/store/mutations';

    @Component({
        components: {
            TaskListItem,
        },
    })
    export default class Home extends Vue {
        // TODO: how do I declare the type of injected $store here?

        public updateNewTaskText(event: Event) {
            this.$store.commit(SET_NEW_TASK_TEXT, (event.target as HTMLInputElement).value);
        }

        public async created() {
            // TODO: this sucks - how do I make it xxxx.loadTasks() ?
            await this.$store.dispatch(LOAD_TASKS);
        }

        public async handleAddTask() {
            const newTaskText = this.$store.state.newTaskText;

            // TODO: this sucks - how do I make it xxxx.putTask('xxx', 'omg') ?
            await this.$store.dispatch(PUT_TASK, {
                id: `${new Date().toISOString()}`,
                text: newTaskText,
            } as Task);

            this.$store.commit(SET_NEW_TASK_TEXT, '');
        }

        public async handleDeleteTask(taskId: string) {
            // TODO: this sucks - how do I make it xxxx.deleteTask(taskId) ?
            await this.$store.dispatch(DELETE_TASK, taskId);
        }
    }
</script>
