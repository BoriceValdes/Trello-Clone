<template>
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Ajouter une nouvelle tâche</h3>
            <button class="close-btn" @click="closeModal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
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
  
            <Select
              v-model="selectedColumnId"
              label="Colonne"
              :options="columnOptions"
            />
          </div>
  
          <div class="modal-footer">
            <Button type="secondary" @click="closeModal">Annuler</Button>
            <Button type="primary" @click="addTask" :disabled="!isFormValid">
              Ajouter la tâche
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
    import TaskItem from '../molecules/TaskItem.vue';
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
  const titleInput = ref<InstanceType<typeof Input> | null>(null);
  
  const newTask = ref<Task>({
    title: '',
    priority: 'medium'
  });
  
  const selectedColumnId = ref(props.columnId);
  
  const priorityOptions = [
    { value: 'high', label: 'Haute priorité' },
    { value: 'medium', label: 'Priorité moyenne' },
    { value: 'low', label: 'Basse priorité' }
  ];
  
  const columnOptions = computed(() => {
    return boardStore.columns.map(column => ({
      value: column.id,
      label: column.title
    }));
  });
  
  const isFormValid = computed(() => {
    return newTask.value.title.trim() !== '' && selectedColumnId.value !== '';
  });
  
  const addTask = () => {
    if (!isFormValid.value) return;
  
    boardStore.addTask(selectedColumnId.value, {
      id: Date.now().toString(),
      ...newTask.value
    });
  
    resetForm();
    closeModal();
  };
  
  const resetForm = () => {
    newTask.value = {
      title: '',
      priority: 'medium'
    };
    selectedColumnId.value = props.columnId;
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
    background-color: var(--bg-main);
    border-radius: 0.5rem;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0.25rem;
  }
  
  .close-btn svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid var(--border);
  }
  
  /* Transition animations */
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  </style>