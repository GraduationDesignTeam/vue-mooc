import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import "normalize.css";
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'default-passive-events'
/*import * as Quill from 'quill'; // 富文本基于quill*/
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(VueVideoPlayer);
//Vue对象添加原型:属性名是$ajax
Vue.prototype.$ajax = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
