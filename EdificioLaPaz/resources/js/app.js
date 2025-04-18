import { createApp } from 'vue';
import Welcome from './components/Welcome.vue';
import Dashboard from './components/DashBoard.vue';
import Productos from './components/Productos.vue';

if (document.querySelector('#welcome')) {
  createApp(Welcome).mount('#welcome');
}

if (document.querySelector('#dashboard')) {
  createApp(Dashboard).mount('#dashboard');
}

if (document.querySelector('#productos')) {
  createApp(Productos).mount('#productos');
}
