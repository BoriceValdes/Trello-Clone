<template>
  <div class="board-container">
    <div class="board-header">
      <h1>Tableau de tâches</h1>
      
      <div class="search-controls">
        <Input
          v-model="boardStore.searchQuery"
          placeholder="Rechercher des tâches..."
          class="search-input"
        />
        <Select
          v-model="boardStore.searchPriority"
          :options="priorityOptions"
          placeholder="Toutes priorités"
          class="priority-filter"
        />
      </div>

      <div class="header-actions">
        <Button 
          type="primary" 
          @click="openAddColumnModal"
          class="action-btn"
        >
          + Colonne
        </Button>
        <PersistControl />
      </div>
    </div>
    
    <draggable 
    :modelValue="boardStore.filteredColumns"
    @update:modelValue="handleColumnsReorder"
    group="columns"
    item-key="id"
    handle=".column-header"
    class="board"
    ghost-class="ghost-column"
    drag-class="dragging-column"
    >
      <template #item="{ element: column }">
        <Column 
          :column="column"
          @task-drag-start="handleTaskDragStart"
        />
      </template>
    </draggable>

    <AddColumnModal
      :isOpen="isAddColumnModalOpen"
      @close="closeAddColumnModal"
      @submit="addNewColumn"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBoardStore } from '../../store/board';
import draggable from 'vuedraggable';
import Button from '../../components/atoms/Button.vue';
import Column from '../../components/organisms/Column.vue';
import PersistControl from '../../components/molecules/PersistControl.vue';
import AddColumnModal from '../../components/molecules/AddColumnModal.vue';
import Input from '../../components/atoms/Input.vue';
import Select from '../../components/atoms/Select.vue';



const boardStore = useBoardStore();
const isAddColumnModalOpen = ref(false);

const priorityOptions = [
  { value: '', label: 'Toutes priorités' },
  { value: 'high', label: 'Haute' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'low', label: 'Basse' }
];

const openAddColumnModal = () => {
  isAddColumnModalOpen.value = true;
};

const closeAddColumnModal = () => {
  isAddColumnModalOpen.value = false;
};

const handleColumnsReorder = (newOrder: Column[]) => {
  boardStore.updateColumnsOrder(newOrder);
  boardStore.saveToLocalStorage();
};

const addNewColumn = (title: string) => {
  boardStore.addColumn(title);
  closeAddColumnModal();
};

const onColumnDragEnd = () => {
  boardStore.saveToLocalStorage();
};

const handleTaskDragStart = (taskId: string, columnId: string) => {
  // Pour un traitement ultérieur si nécessaire
};
</script>

<style scoped>
.board-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}

.search-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-right: auto;
}

.search-input {
  width: 250px;
}

.priority-filter {
  width: 180px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.board {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  min-height: 600px;
}

.ghost-column {
  opacity: 0.5;
  background: #c8ebfb;
}

.dragging-column {
  transform: rotate(2deg);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
</style>








