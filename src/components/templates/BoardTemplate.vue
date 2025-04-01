<template>
  <div class="board-container">
    <div class="board-header">
      <h1>Tableau de tâches</h1>
      <Button type="secondary" @click="addColumn">+ Ajouter une colonne</Button>
    </div>
    
    <div class="board">
      <Column
        v-for="column in boardStore.columns"
        :key="column.id"
        :column="column"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '../../store/board';
import Button from '../../components/atoms/Button.vue';
import Column from '../../components/organisms/Column.vue';

const boardStore = useBoardStore();

const addColumn = () => {
  boardStore.addColumn({
    id: Date.now().toString(),
    title: 'Nouvelle colonne',
    tasks: []
  });
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
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
}

.board {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
}
</style>