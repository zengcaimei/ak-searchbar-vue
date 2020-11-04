import Vue from 'vue';
import App from './App';
import router from './router';

import  {SearchBar}  from '@/components';
Vue.use(SearchBar);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});