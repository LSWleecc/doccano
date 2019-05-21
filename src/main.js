// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Annotator from './components/annotator.vue'
import SlideBar from './components/SlideBar.vue'
import 'element-ui/lib/theme-chalk/index.css'
import { Button , Dialog ,Menu,Submenu, MenuItem,MenuItemGroup,Radio,RadioGroup,RadioButton} from 'element-ui'
import store from '../store/index'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Menu)

Vue.use(Submenu)

Vue.use(MenuItem)

Vue.use(RadioButton)
Vue.use(MenuItemGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.component('Annotator', Annotator)
Vue.component('SlideBar', SlideBar)
Vue.use(require('vue-shortkey'), {
  prevent: ['input', 'textarea'],
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})
