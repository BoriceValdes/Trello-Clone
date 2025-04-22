<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Ajouter une tâche</h3>
          <button class="close-btn" @click="closeModal">
            ✕
          </button>
        </div>

        <div class="modal-body">
          <Input 
            v-model="newTask.title"
            label="Titre de la tâche"
            placeholder="Que faut-il faire ?"
            ref="titleInput"
          />
          <Select
            v-model="newTask.priority"
            label="Priorité"
            :options="priorityOptions"
          />
        </div>

        <div class="modal-footer">
          <Button type="secondary" @click="closeModal">Annuler</Button>
          <Button 
            type="primary" 
            @click="addTask"
            :disabled="!isFormValid"
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';
import { useBoardStore } from '../../store/board';
import Input from '../atoms/Input.vue';
import Button from '../atoms/Button.vue';
import Select from '../atoms/Select.vue';

interface Task {
  title: string;
  priority: string;
}

const props = defineProps<{
  isOpen: boolean;
  columnId: string;
}>();

const emit = defineEmits(['close']);

const boardStore = useBoardStore();
const newTask = ref<Task>({
  title: '',
  priority: 'medium'
});
const titleInput = ref<InstanceType<typeof Input> | null>(null);

const priorityOptions = [
  { value: 'high', label: 'Haute priorité' },
  { value: 'medium', label: 'Priorité moyenne' },
  { value: 'low', label: 'Basse priorité' }
];

const isFormValid = computed(() => {
  return newTask.value.title.trim() !== '';
});

const addTask = () => {
  if (!isFormValid.value) return;

  boardStore.addTask(props.columnId, {
    title: newTask.value.title,
    priority: newTask.value.priority
  });

  newTask.value = { title: '', priority: 'medium' };
  closeModal();
};

const closeModal = () => {
  emit('close');
};

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      titleInput.value?.focus();
    });
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style> 
