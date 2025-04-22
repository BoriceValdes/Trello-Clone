<template>
  <div 
    class="task-item"
    draggable="true"
    @dragstart="onDragStart"
    :data-priority="task.priority"
  >
    <div class="task-header">
      <div v-if="!isEditing" class="task-content">
        <h4 v-html="highlightText(task.title)"></h4>
        <p v-if="task.description" class="task-description" v-html="highlightText(task.description)"></p>
        <span class="priority-badge" :class="task.priority">
          {{ priorityLabel }}
        </span>
      </div>
      <div v-else class="edit-form">
        <Input 
          v-model="editForm.title"
          label="Titre"
          ref="titleInput"
        />
        <Input
          v-model="editForm.description"
          label="Description"
          type="textarea"
        />
        <Select
          v-model="editForm.priority"
          label="Priorité"
          :options="priorityOptions"
        />
      </div>
    </div>
    
    <div class="task-actions">
      <Button 
        v-if="!isEditing"
        type="secondary" 
        @click="startEditing"
      >
        ✏️ Modifier
      </Button>
      <Button 
        v-else
        type="primary" 
        @click="saveChanges"
      >
        💾 Sauvegarder
      </Button>
      
      <Button 
        type="danger" 
        @click="$emit('delete', task.id)"
      >
        🗑️ Supprimer
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue';
import { useBoardStore } from '../../store/board';
import Input from '../atoms/Input.vue';
import Select from '../atoms/Select.vue';
import Button from '../atoms/Button.vue';

const props = defineProps<{
  task: {
    id: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
    description?: string;
  };
  columnId: string;
}>();

const emit = defineEmits(['delete', 'update', 'drag-start']);

const boardStore = useBoardStore();
const isEditing = ref(false);
const editForm = ref({
  title: props.task.title,
  description: props.task.description || '',
  priority: props.task.priority
});

const priorityOptions = [
  { value: 'high', label: 'Haute priorité' },
  { value: 'medium', label: 'Priorité moyenne' },
  { value: 'low', label: 'Basse priorité' }
];

const priorityLabel = computed(() => {
  return priorityOptions.find(opt => opt.value === props.task.priority)?.label || '';
});

const highlightText = (text: string) => {
  if (!boardStore.searchQuery) return text;
  const regex = new RegExp(`(${escapeRegExp(boardStore.searchQuery)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const onDragStart = (e: DragEvent) => {
  emit('drag-start', e, props.task.id, props.columnId);
  e.dataTransfer?.setData('taskId', props.task.id);
  e.dataTransfer?.setData('sourceColumnId', props.columnId);
  e.dataTransfer!.effectAllowed = 'move';
};

const startEditing = () => {
  isEditing.value = true;
};

const saveChanges = () => {
  emit('update', props.task.id, {
    title: editForm.value.title,
    description: editForm.value.description,
    priority: editForm.value.priority
  });
  isEditing.value = false;
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
}

.task-item[draggable="true"] {
  cursor: grab;
}

.task-item:active {
  cursor: grabbing;
}

.task-item[data-priority="high"] {
  border-left-color: #ef4444;
}

.task-item[data-priority="medium"] {
  border-left-color: #f59e0b;
}

.task-item[data-priority="low"] {
  border-left-color: #10b981;
}

.task-header {
  margin-bottom: 12px;
}

.task-content h4 {
  margin: 0 0 8px 0;
  word-break: break-word;
}

.task-description {
  margin: 0 0 8px 0;
  font-size: 0.875rem;
  color: #64748b;
  word-break: break-word;
}

.priority-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.priority-badge.high {
  background-color: #fee2e2;
  color: #b91c1c;
}

.priority-badge.medium {
  background-color: #fef3c7;
  color: #92400e;
}

.priority-badge.low {
  background-color: #dcfce7;
  color: #166534;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

:deep(mark) {
  background-color: #fde047;
  padding: 0 2px;
  border-radius: 2px;
}
</style>




