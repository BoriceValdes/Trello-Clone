import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);

// Initialiser Pinia
const pinia = createPinia();

// Hydrater le store au démarrage
pinia.use(({ store }) => {
  const savedState = localStorage.getItem('kanban-board');
  if (savedState) {
    store.$patch(JSON.parse(savedState));
  }
});

app.use(router).use(pinia).mount('#app');