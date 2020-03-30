import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import "normalize.css";

Vue.config.productionTip = false
Vue.use(ElementUI);
//Vue对象添加原型:属性名是$ajax
Vue.prototype.$ajax = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
