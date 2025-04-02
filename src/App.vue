<template>
  <div class="app-container">
    <!-- Barre de navigation -->
    <nav class="app-navbar">
      <RouterLink to="/" class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="logo-icon">
          <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
        </svg>
        <span>KanbanFlow</span>
      </RouterLink>
      
      <div class="nav-links">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/board">Tableau</RouterLink>
        <RouterLink to="/features">Fonctionnalités</RouterLink>
      </div>
      
      <div class="user-actions">
        <button class="theme-toggle" @click="toggleTheme">
          <svg v-if="darkMode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main class="app-main">
      <RouterView />
    </main>

    <!-- Pied de page -->
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>KanbanFlow</h3>
          <p>Organisez votre travail efficacement avec notre solution Kanban moderne.</p>
        </div>
        <div class="footer-links">
          <RouterLink to="/privacy">Confidentialité</RouterLink>
          <RouterLink to="/terms">Conditions</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>
      </div>
      <div class="footer-copyright">
        © {{ new Date().getFullYear() }} KanbanFlow. Tous droits réservés.
      </div>
    </footer>

    <!-- Notifications -->
    <Transition name="fade">
      <div v-if="showNotification" class="notification">
        {{ notificationMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const darkMode = ref(false);
const showNotification = ref(false);
const notificationMessage = ref('');

const toggleTheme = () => {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle('dark', darkMode.value);
  localStorage.setItem('darkMode', darkMode.value.toString());
  showNotification.value = true;
  notificationMessage.value = darkMode.value ? 'Mode sombre activé' : 'Mode clair activé';
  
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

onMounted(() => {
  // Vérifier le thème au chargement
  const savedMode = localStorage.getItem('darkMode') === 'true';
  darkMode.value = savedMode;
  document.documentElement.classList.toggle('dark', savedMode);
});
</script>

<style>
/* Variables CSS */
:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --text-main: #1e293b;
  --text-secondary: #64748b;
  --bg-main: #ffffff;
  --bg-secondary: #f8fafc;
  --border: #e2e8f0;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark {
  --primary: #818cf8;
  --primary-hover: #6366f1;
  --text-main: #f1f5f9;
  --text-secondary: #94a3b8;
  --bg-main: #0f172a;
  --bg-secondary: #1e293b;
  --border: #334155;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Styles de base */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-secondary);
  color: var(--text-main);
  transition: background-color 0.3s, color 0.3s;
}

.app-main {
  flex: 1;
  padding: 2rem;
}

/* Barre de navigation */
.app-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--bg-main);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--primary);
  text-decoration: none;
}

.logo-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: var(--text-main);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links a.router-link-active {
  color: var(--primary);
}

.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
}

.user-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-main);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.theme-toggle:hover {
  background-color: var(--bg-secondary);
}

.theme-toggle svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Pied de page */
.app-footer {
  background-color: var(--bg-main);
  padding: 2rem;
  border-top: 1px solid var(--border);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-section {
  max-width: 400px;
}

.footer-section h3 {
  margin-bottom: 1rem;
  color: var(--primary);
}

.footer-section p {
  color: var(--text-secondary);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--primary);
}

.footer-copyright {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* Notification */
.notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--primary);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  z-index: 1000;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .app-navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .footer-content {
    flex-direction: column;
  }
}
</style>