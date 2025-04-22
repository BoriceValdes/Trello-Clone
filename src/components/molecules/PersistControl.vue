<template>
  <div class="persist-control">
    <Button 
      @click="handleSave" 
      type="secondary"
    >
      💾 Sauvegarder
    </Button>
    <Button 
      @click="handleReset" 
      type="danger"
    >
      🔄 Réinitialiser
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '../../store/board';
import Button from '../../components/atoms/Button.vue';

const boardStore = useBoardStore();

const handleSave = () => {
  boardStore.saveToLocalStorage();
  alert('Tableau sauvegardé !');
};

const handleReset = () => {
  if (confirm('Réinitialiser le tableau ? Toutes les données seront perdues.')) {
    boardStore.resetBoard();
  }
};
</script>

<style scoped>
.persist-control {
  display: flex;
  gap: 8px;
}
</style>



