<template>
  <div class="column">
    <div class="column-header">
      <h3>{{ column.title }}</h3>
      <div class="column-actions">
        <span class="task-count">{{ column.tasks.length }} tâches</span>
        <button class="delete-column" @click.stop="deleteThisColumn">
          🗑️
        </button>
      </div>
    </div>
    
    <draggable
      v-model="column.tasks"
      group="tasks"
      item-key="id"
      @end="onTaskDragEnd"
      class="tasks-list"
    >
      <template #item="{ element: task }">
        <TaskItem
          :task="task"
          :columnId="column.id"
          @delete="deleteTask"
          @update="updateTask"
          @drag-start="(e) => $emit('task-drag-start', task.id, column.id)"
        />
      </template>
    </draggable>
    
    <Button 
      @click="openAddTaskModal"
      type="secondary" 
      full-width
    >
      + Tâche
    </Button>

    <AddTaskModal
      :isOpen="isAddTaskModalOpen"
      :columnId="column.id"
      @close="closeAddTaskModal"
      @submit="addNewTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBoardStore } from '../../store/board';
import draggable from 'vuedraggable';
import Button from '../atoms/Button.vue';
import TaskItem from '../molecules/TaskItem.vue';
import AddTaskModal from '../molecules/AddTaskModal.vue';

const props = defineProps<{
  column: {
    id: string;
    title: string;
    tasks: Array<{
      id: string;
      title: string;
      priority: 'high' | 'medium' | 'low';
      description?: string;
    }>;
  };
}>();

const emit = defineEmits(['task-drag-start']);

const boardStore = useBoardStore();
const isAddTaskModalOpen = ref(false);

const deleteTask = (taskId: string) => {
  boardStore.deleteTask(props.column.id, taskId);
};

const updateTask = (taskId: string, updates: Partial<Task>) => {
  boardStore.updateTask(props.column.id, taskId, updates);
};

const deleteThisColumn = () => {
  if (confirm(`Supprimer la colonne "${props.column.title}" ?`)) {
    boardStore.deleteColumn(props.column.id);
  }
};

const onTaskDragEnd = () => {
  boardStore.saveToLocalStorage();
};

const openAddTaskModal = () => {
  isAddTaskModalOpen.value = true;
};

const closeAddTaskModal = () => {
  isAddTaskModalOpen.value = false;
};

const addNewTask = (task: { title: string; description: string; priority: string }) => {
  boardStore.addTask(props.column.id, {
    title: task.title,
    description: task.description,
    priority: task.priority as 'high' | 'medium' | 'low'
  });
  closeAddTaskModal();
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
  user-select: none;
}

.column-header {
  cursor: grab;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.column-header:active {
  cursor: grabbing;
}

.column-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.delete-column {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
  padding: 4px;
  border-radius: 4px;
}

.delete-column:hover {
  color: #ef4444;
  background-color: #fee2e2;
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
  min-height: 100px;
}
</style>




