import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import App from './App.vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';

Vue.use(AsyncComputed);
Vue.use(VueResource);
Vue.use(Vuex);

Vue.config.productionTip = false;
Vue.http.options.root = 'https://warper.wmflabs.org/api/v1';

export const store = new Vuex.Store({
  state: {
    username: null,
    token: null,
  },
  mutations: {
    signIn(state, event) {
      state.token = event.auth_token;
      state.username = event.name;
    },

    signOut(state) {
      state.token = null;
      state.username = null;
    }
  }
});

new Vue({
  render: h => h(App)
}).$mount('#app');
