<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Nouvelle tâche</h3>
          <button class="close-btn" @click="close">
            ✕
          </button>
        </div>

        <div class="modal-body">
          <Input 
            v-model="form.title"
            label="Titre"
            placeholder="Que faut-il faire ?"
            ref="titleInput"
            @keyup.enter="submit"
          />
          <Input
            v-model="form.description"
            label="Description"
            placeholder="Détails de la tâche..."
            type="textarea"
          />
          <Select
            v-model="form.priority"
            label="Priorité"
            :options="priorityOptions"
          />
        </div>

        <div class="modal-footer">
          <Button type="secondary" @click="close">Annuler</Button>
          <Button 
            type="primary" 
            @click="submit"
            :disabled="!form.title.trim()"
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import Input from '../atoms/Input.vue';
import Button from '../atoms/Button.vue';
import Select from '../atoms/Select.vue';

const props = defineProps<{
  isOpen: boolean;
  columnId: string;
}>();

const emit = defineEmits(['close', 'submit']);

const form = ref({
  title: '',
  description: '',
  priority: 'medium'
});

const priorityOptions = [
  { value: 'high', label: 'Haute priorité' },
  { value: 'medium', label: 'Priorité moyenne' },
  { value: 'low', label: 'Basse priorité' }
];

const titleInput = ref<InstanceType<typeof Input> | null>(null);

const close = () => {
  form.value = { title: '', description: '', priority: 'medium' };
  emit('close');
};

const submit = () => {
  if (!form.value.title.trim()) return;
  emit('submit', { ...form.value });
  close();
};

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      titleInput.value?.focus();
    });
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>



