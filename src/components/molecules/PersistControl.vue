<template>
  <div class="persist-control">
    <Button 
      @click="handleSave" 
      type="secondary"
      class="persist-btn"
    >
      Sauvegarder
    </Button>
    <Button 
      @click="handleReset" 
      type="danger"
      class="persist-btn"
    >
      Réinitialiser
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '../../store/board';
import Button from '../../components/atoms/Button.vue';

const boardStore = useBoardStore();

const handleSave = () => {
  localStorage.setItem('kanban-board', JSON.stringify(boardStore.columns));
  alert('Tableau sauvegardé !');
};

const handleReset = () => {
  if (confirm('Voulez-vous vraiment réinitialiser le tableau ?')) {
    boardStore.resetBoard();
  }
};
</script>

<style scoped>
.persist-control {
  display: flex;
  gap: 12px;
}

.persist-btn {
  flex-shrink: 0;
}
</style>