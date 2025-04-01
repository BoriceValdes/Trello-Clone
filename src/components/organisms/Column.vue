<template>
  <div 
    class="column"
    @drop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="column-header">
      <h3>{{ column.title }}</h3>
      <span class="task-count">{{ column.tasks.length }} tâches</span>
    </div>
    
    <div class="tasks-list">
      <TaskItem
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
        @delete="deleteTask"
      />
    </div>
    
    <div class="add-task">
      <Input 
        v-model="newTaskTitle"
        placeholder="Ajouter une nouvelle tâche"
        @keyup.enter="addTask"
      />
      <Button @click="addTask" full-width>Ajouter</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBoardStore } from '../../store/board';
import Input from '../atoms/Input.vue';
import Button from '../atoms/Button.vue';
import TaskItem from '../molecules/TaskItem.vue';

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  priority: string;
}

const props = defineProps<{
  column: Column;
}>();

const boardStore = useBoardStore();
const newTaskTitle = ref('');

const deleteTask = (taskId: string) => {
  boardStore.deleteTask(props.column.id, taskId);
};

const addTask = () => {
  if (newTaskTitle.value.trim()) {
    boardStore.addTask(props.column.id, {
      id: Date.now().toString(),
      title: newTaskTitle.value,
      priority: 'medium'
    });
    newTaskTitle.value = '';
  }
};

const onDrop = (e: DragEvent) => {
  const taskId = e.dataTransfer?.getData('taskId');
  if (taskId) {
    boardStore.moveTask(taskId, props.column.id);
  }
};
</script>

<style scoped>
.column {
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

h3 {
  margin: 0;
  font-size: 1.125rem;
  color: #111827;
}

.task-count {
  font-size: 0.875rem;
  color: #6b7280;
  background-color: #e5e7eb;
  padding: 2px 8px;
  border-radius: 9999px;
}

.tasks-list {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 4px;
}

.add-task {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>