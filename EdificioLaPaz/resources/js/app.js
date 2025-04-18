import { createApp } from 'vue';
import Welcome from './components/Welcome.vue';
import Dashboard from './components/DashBoard.vue';

if (document.querySelector('#welcome')) {
  createApp(Welcome).mount('#welcome');
}

if (document.querySelector('#dashboard')) {
  createApp(Dashboard).mount('#dashboard');
}
