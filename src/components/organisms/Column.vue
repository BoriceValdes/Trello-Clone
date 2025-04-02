<template>
  <div 
    class="column"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop="onDrop"
    @dragenter.prevent
  >
    <div class="column-header">
      <h3>{{ column.title }}</h3>
      <div class="column-actions">
        <span class="task-count">{{ column.tasks.length }} tâches</span>
        <button class="delete-column" @click.stop="deleteThisColumn">
          🗑️
        </button>
      </div>
    </div>
    
    <div class="tasks-list">
      <TaskItem
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
        :columnId="column.id"
        @delete="deleteTask"
      />
    </div>
    
    <Button 
      @click="openModal"
      type="secondary" 
      full-width
    >
      + Ajouter une tâche
    </Button>

    <AddTaskModal
      :isOpen="isModalOpen"
      :columnId="column.id"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBoardStore } from '../../store/board';
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
      priority: string;
    }>;
  };
}>();

const boardStore = useBoardStore();
const isModalOpen = ref(false);

const deleteTask = (taskId: string) => {
  boardStore.deleteTask(props.column.id, taskId);
};

const deleteThisColumn = () => {
  if (confirm(`Voulez-vous vraiment supprimer la colonne "${props.column.title}" ?`)) {
    boardStore.deleteColumn(props.column.id);
  }
};

const onDragStart = (e: DragEvent) => {
  if (e.dataTransfer) {
    e.dataTransfer.setData('columnId', props.column.id);
    e.dataTransfer.effectAllowed = 'move';
  }
};

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  const taskId = e.dataTransfer?.getData('taskId');
  if (taskId) {
    boardStore.moveTask(taskId, props.column.id);
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
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
  cursor: grab;
}

.column:active {
  cursor: grabbing;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.column-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.delete-column {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s;
  padding: 4px;
  border-radius: 4px;
}

.delete-column:hover {
  color: #ef4444;
  background-color: #fee2e2;
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
</style>