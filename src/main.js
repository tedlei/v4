console.log('开始加载ele与全局mixins')
console.time()
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import App from './App.vue'
import router from './router'
import store from './store'
import '../public/css/global.less'   // 全局样式
import {Api, mixins} from './mixin'

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    error: '../public/images/loading.png',
    loading: '../public/images/loading.png',
    attempt: 1
})

Vue.use(ElementUI);
Vue.use(mixins);
Api.install.call(Vue);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    components: {App: () => import('./App.vue')},
    template: '<App/>'
}).$mount('#app');
