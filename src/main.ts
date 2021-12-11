import '@/assets/styles/font.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import VueRx from 'vue-rx';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead);

Vue.use(VueRx);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
