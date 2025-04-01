<template>
    <div class="input-container">
      <label v-if="label" :for="id">{{ label }}</label>
      <input
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :type="type"
      />
    </div>
</template>
  
<script setup lang="ts">
  import { nanoid } from 'nanoid';
  
  defineProps({
    modelValue: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: () => nanoid()
    }
  });
  
  defineEmits(['update:modelValue']);
  </script>
  
  <style scoped>
  .input-container {
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
  
  input {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  
    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
  }
</style>