<template>
    <button 
      :class="['btn', type, { 'full-width': fullWidth }]"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps({
    type: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'danger'].includes(value)
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  });
</script>
  
<style scoped>
  .btn {
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  
    &.primary {
      background-color: #4f46e5;
      color: white;
  
      &:hover {
        background-color: #4338ca;
      }
    }
  
    &.secondary {
      background-color: #e0e7ff;
      color: #4f46e5;
  
      &:hover {
        background-color: #c7d2fe;
      }
    }
  
    &.danger {
      background-color: #ef4444;
      color: white;
  
      &:hover {
        background-color: #dc2626;
      }
    }
  
    &.full-width {
      width: 100%;
    }
  }
</style>