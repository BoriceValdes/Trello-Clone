<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Nouvelle colonne</h3>
          <button class="close-btn" @click="close">
            ✕
          </button>
        </div>

        <div class="modal-body">
          <Input 
            v-model="title"
            label="Nom de la colonne"
            placeholder="Ex: En revue"
            ref="titleInput"
            @keyup.enter="submit"
          />
        </div>

        <div class="modal-footer">
          <Button type="secondary" @click="close">Annuler</Button>
          <Button 
            type="primary" 
            @click="submit"
            :disabled="!title.trim()"
          >
            Créer
          </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'; // Ajout de watch ici
import Input from '../atoms/Input.vue';
import Button from '../atoms/Button.vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'submit']);

const title = ref('');
const titleInput = ref<InstanceType<typeof Input> | null>(null);

const close = () => {
  title.value = '';
  emit('close');
};

const submit = () => {
  if (!title.value.trim()) return;
  emit('submit', title.value);
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



