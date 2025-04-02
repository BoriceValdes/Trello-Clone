import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

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
  const loadFromStorage = () => {
    const saved = localStorage.getItem('kanban-board');
    return saved ? JSON.parse(saved) : [
      { 
        id: '1', 
        title: 'À faire', 
        tasks: [
          { id: '1', title: 'Tâche exemple', priority: 'medium' }
        ] 
      },
      { id: '2', title: 'En cours', tasks: [] },
      { id: '3', title: 'Terminé', tasks: [] }
    ];
  };

  const columns = ref<Column[]>(loadFromStorage());

  watch(
    columns,
    (newColumns) => {
      localStorage.setItem('kanban-board', JSON.stringify(newColumns));
    },
    { deep: true }
  );

  const addColumn = (column: Omit<Column, 'id'> & { id?: string }) => {
    const newColumn = {
      id: column.id || Date.now().toString(),
      title: column.title || 'Nouvelle Colonne',
      tasks: column.tasks || []
    };
    
    columns.value.push(newColumn);
  };

  const deleteColumn = (columnId: string) => {
    if (columns.value.length <= 1) {
      alert("Vous ne pouvez pas supprimer la dernière colonne");
      return;
    }
    columns.value = columns.value.filter(column => column.id !== columnId);
  };

  const addTask = (columnId: string, task: Omit<Task, 'id'>) => {
    const column = columns.value.find(c => c.id === columnId);
    if (column) {
      column.tasks.push({
        id: Date.now().toString(),
        ...task
      });
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
    
    for (const column of columns.value) {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        task = column.tasks[taskIndex];
        column.tasks.splice(taskIndex, 1);
        break;
      }
    }
    
    if (task) {
      const toColumn = columns.value.find(c => c.id === toColumnId);
      if (toColumn) {
        toColumn.tasks.push(task);
      }
    }
  };

  const updateTask = (columnId: string, taskId: string, updates: Partial<Task>) => {
    const column = columns.value.find(c => c.id === columnId);
    if (!column) return;
  
    const taskIndex = column.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
  
    column.tasks[taskIndex] = {
      ...column.tasks[taskIndex],
      ...updates
    };
  };

  const resetBoard = () => {
    columns.value = [
      { 
        id: '1', 
        title: 'À faire', 
        tasks: [
          { id: '1', title: 'Tâche exemple', priority: 'medium' }
        ] 
      },
      { id: '2', title: 'En cours', tasks: [] },
      { id: '3', title: 'Terminé', tasks: [] }
    ];
  };

  return {
    columns,
    addColumn,
    deleteColumn,
    addTask,
    deleteTask,
    moveTask,
    updateTask,
    resetBoard
  };
});