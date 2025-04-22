<template>
  <div class="select-container">
    <label v-if="label" class="select-label">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="select-field"
      v-bind="$attrs"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string;
  label?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
.select-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.select-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.select-field {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  background-color: white;
}

.select-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #bfdbfe;
}
</style>