import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import vuetify from './config/vuetify';
import router from './router';

createApp(App)
.use(vuetify)
.use(router)
.mount('#app');
