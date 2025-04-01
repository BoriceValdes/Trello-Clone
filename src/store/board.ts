import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Task {
  id: string;
  title: string;
  priority: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export const useBoardStore = defineStore('board', () => {
  const columns = ref<Column[]>([
    { 
      id: '1', 
      title: 'À faire', 
      tasks: [
        { id: '1', title: 'Tâche exemple', priority: 'medium' }
      ] 
    },
    { id: '2', title: 'En cours', tasks: [] },
    { id: '3', title: 'Terminé', tasks: [] }
  ]);

  const addColumn = (column: Column) => {
    columns.value.push(column);
  };

  const addTask = (columnId: string, task: Task) => {
    const column = columns.value.find(c => c.id === columnId);
    if (column) {
      column.tasks.push(task);
    }
  };

  const deleteTask = (columnId: string, taskId: string) => {
    const column = columns.value.find(c => c.id === columnId);
    if (column) {
      column.tasks = column.tasks.filter(t => t.id !== taskId);
    }
  };

  const moveTask = (taskId: string, toColumnId: string) => {
    let task: Task | null = null;
    
    // Remove task from current column
    for (const column of columns.value) {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        task = column.tasks[taskIndex];
        column.tasks.splice(taskIndex, 1);
        break;
      }
    }
    
    // Add to new column
    if (task) {
      const toColumn = columns.value.find(c => c.id === toColumnId);
      if (toColumn) {
        toColumn.tasks.push(task);
      }
    }
  };

  return {
    columns,
    addColumn,
    addTask,
    deleteTask,
    moveTask
  };
});