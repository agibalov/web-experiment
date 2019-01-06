<template>
    <div>
        <span class="id">id={{task.id}}</span>&nbsp;
        <span class="text">text={{task.text}}</span>
        <button type="button" class="button" @click="deleteTask(task.id)">Delete</button>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Task } from '@/store/state';

@Component
export default class TaskListItem extends Vue {
    @Prop() private task!: Task;

    @Emit()
    public deleteTask(taskId: string) {
        // Intentionally empty
    }
}
</script>

<style scoped lang="scss">
    .id {
        color: red;
    }

    .text {
        color: green;
    }
</style>
