import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import * as VeeValidate from 'vee-validate';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
