
<template>
  <div 
    class="task-item" 
    draggable="true" 
    @dragstart="onDragStart"
    :data-priority="task.priority"
  >
    <div class="task-header">
      <Input v-model="task.title" label="Tâche" />
      <Select
        v-model="task.priority"
        label="Priorité"
        :options="priorityOptions"
      />
    </div>
    <div class="task-actions">
      <Button type="danger" @click="$emit('delete', task.id)">
        <span class="icon">🗑️</span> Supprimer
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Input from '../atoms/Input.vue';
import Select from '../atoms/Select.vue';
import Button from '../atoms/Button.vue';


interface Task {
  id: string;
  title: string;
  priority: string;
}

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits(['delete']);

const priorityOptions = [
  { value: 'high', label: 'Haute priorité' },
  { value: 'medium', label: 'Priorité moyenne' },
  { value: 'low', label: 'Basse priorité' }
];

const onDragStart = (e: DragEvent) => {
  if (e.dataTransfer) {
    e.dataTransfer.setData('taskId', props.task.id);
    e.dataTransfer.effectAllowed = 'move';
  }
};
</script>

<style scoped>
.task-item {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  transition: all 0.2s;
  border-left: 4px solid;

  &[draggable="true"] {
    cursor: grab;
  }

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &[data-priority="high"] {
    border-left-color: #ef4444;
  }

  &[data-priority="medium"] {
    border-left-color: #f59e0b;
  }

  &[data-priority="low"] {
    border-left-color: #10b981;
  }
}

.task-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
}

.icon {
  font-size: 1rem;
}
</style>