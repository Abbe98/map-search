import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import App from './App.vue';
import VueResource from 'vue-resource';

Vue.use(AsyncComputed);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = 'https://warper.wmflabs.org/api/v1';

new Vue({
  render: h => h(App)
}).$mount('#app');
