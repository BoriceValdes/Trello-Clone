<template>
    <div class="select-container">
      <label v-if="label" :for="id">{{ label }}</label>
      <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option disabled value="">Sélectionnez une option</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
</template>
  
<script setup lang="ts">
  import { nanoid } from 'nanoid';
  
  interface Option {
    value: string;
    label: string;
  }
  
  defineProps({
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array as () => Option[],
      required: true
    },
    id: {
      type: String,
      default: () => nanoid()
    }
  });
  
  defineEmits(['update:modelValue']);
  </script>
  
  <style scoped>
  .select-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
  
  label {
    font-size: 0.875rem;
    color: #4b5563;
    font-weight: 500;
  }
  
  select {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s;
  
    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
  }
</style>