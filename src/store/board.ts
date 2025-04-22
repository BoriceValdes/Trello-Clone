import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export const useBoardStore = defineStore('board', () => {
  // State
  const columns = ref<Column[]>(loadFromStorage());
  const searchQuery = ref('');
  const searchPriority = ref<string>('');

  // Getters
  const filteredColumns = computed(() => {
    if (!searchQuery.value && !searchPriority.value) return columns.value;
    
    return columns.value.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => {
        const matchesText = searchQuery.value 
          ? task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
            (task.description?.toLowerCase().includes(searchQuery.value.toLowerCase()))
          : true;
        
        const matchesPriority = searchPriority.value
          ? task.priority === searchPriority.value
          : true;
        
        return matchesText && matchesPriority;
      })
    })).filter(column => column.tasks.length > 0);
  });

  // Actions
  function loadFromStorage() {
    const saved = localStorage.getItem('kanban-board');
    return saved ? JSON.parse(saved) : getDefaultBoard();
  }

  function getDefaultBoard(): Column[] {
    return [
      { 
        id: '1', 
        title: 'À faire', 
        tasks: [
          { id: '1', title: 'Exemple de tâche', priority: 'medium', description: 'Description exemple' }
        ] 
      },
      { id: '2', title: 'En cours', tasks: [] },
      { id: '3', title: 'Terminé', tasks: [] }
    ];
  }

  function saveToLocalStorage() {
    localStorage.setItem('kanban-board', JSON.stringify(columns.value));
  }

  function addColumn(title: string) {
    columns.value.push({
      id: Date.now().toString(),
      title,
      tasks: []
    });
  }

  function deleteColumn(columnId: string) {
    if (columns.value.length <= 1) {
      alert("Vous devez garder au moins une colonne");
      return;
    }
    columns.value = columns.value.filter(col => col.id !== columnId);
  }

  function addTask(columnId: string, task: Omit<Task, 'id'>) {
    const column = columns.value.find(col => col.id === columnId);
    if (column) {
      column.tasks.push({
        id: Date.now().toString(),
        ...task
      });
    }
  }

  function deleteTask(columnId: string, taskId: string) {
    const column = columns.value.find(col => col.id === columnId);
    if (column) {
      column.tasks = column.tasks.filter(task => task.id !== taskId);
    }
  }

  function updateTask(columnId: string, taskId: string, updates: Partial<Task>) {
    const column = columns.value.find(col => col.id === columnId);
    if (!column) return;

    const task = column.tasks.find(t => t.id === taskId);
    if (task) {
      Object.assign(task, updates);
    }
  }

  function resetBoard() {
    columns.value = getDefaultBoard();
  }

  function updateColumnsOrder(newColumns: Column[]) {
    // Mettez à jour l'ordre des colonnes originales
    columns.value = newColumns.map(newCol => {
      const original = columns.value.find(col => col.id === newCol.id);
      return original || newCol;
    });
  }

  // Watcher
  watch(columns, saveToLocalStorage, { deep: true });

  return {
    columns,
    filteredColumns,
    searchQuery,
    searchPriority,
    addColumn,
    deleteColumn,
    addTask,
    deleteTask,
    updateTask,
    resetBoard,
    saveToLocalStorage,
    updateColumnsOrder
  };
});