import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.scss'
import Inview from 'vueinview'

Vue.use(Vant)
Vue.use(Inview)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')