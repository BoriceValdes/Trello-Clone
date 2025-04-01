import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../pages/BoardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BoardView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
});

export default router;