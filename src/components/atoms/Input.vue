<template>
  <div class="input-container">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      v-if="type !== 'textarea'"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="input-field"
      v-bind="$attrs"
    >
    <textarea
      v-else
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      class="input-field textarea"
      v-bind="$attrs"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string;
  label?: string;
  placeholder?: string;
  type?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.input-field {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #bfdbfe;
}

.textarea {
  min-height: 80px;
  resize: vertical;
}
</style>