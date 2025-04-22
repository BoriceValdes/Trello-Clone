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

  const saveToLocalStorage = () => {
    localStorage.setItem('kanban-board', JSON.stringify(columns.value));
  };

  watch(
    columns,
    (newColumns) => {
      saveToLocalStorage();
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
    const sourceColumn = columns.value.find(col => 
      col.tasks.some(task => task.id === taskId)
    );
    
    if (!sourceColumn) return;
    
    const taskIndex = sourceColumn.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    
    const task = sourceColumn.tasks[taskIndex];
    const targetColumn = columns.value.find(col => col.id === toColumnId);
    
    if (targetColumn && targetColumn !== sourceColumn) {
      sourceColumn.tasks.splice(taskIndex, 1);
      targetColumn.tasks.push(task);
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
    resetBoard,
    saveToLocalStorage
  };
});