<template>
  <div class="board-container">
    <div class="board-header">
      <h1>Tableau de tâches</h1>
      <div class="header-actions">
        <Button 
          type="primary" 
          @click="openAddColumnModal"
          class="action-btn"
        >
          + Ajouter une colonne
        </Button>
        
        <PersistControl class="persist-control" />
      </div>
    </div>
    
    <draggable 
      v-model="boardStore.columns"
      group="columns"
      item-key="id"
      handle=".column"
      @end="onColumnDragEnd"
      class="board"
    >
      <template #item="{ element: column }">
        <Column :column="column" />
      </template>
    </draggable>

    <AddColumnModal
      :isOpen="isAddColumnModalOpen"
      @close="closeAddColumnModal"
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

const boardStore = useBoardStore();
const isAddColumnModalOpen = ref(false);

const openAddColumnModal = () => {
  isAddColumnModalOpen.value = true;
};

const closeAddColumnModal = () => {
  isAddColumnModalOpen.value = false;
};

const onColumnDragEnd = () => {
  // La réactivité de Pinia mettra automatiquement à jour le store
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
  gap: 20px;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
  white-space: nowrap;
}

.board {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  min-height: 600px;
}

.action-btn {
  flex-shrink: 0;
}

.persist-control {
  display: flex;
  gap: 12px;
}
</style>










