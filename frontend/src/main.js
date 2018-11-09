// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/display.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Navbar, Form, Button, FormGroup, FormInput, Layout } from 'bootstrap-vue/es/components'
import App from './App'
import router from './router'
import i18n from './locale'
import VeeValidate, { Validator } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru'
import en from 'vee-validate/dist/locale/en'
import ua from './locale/ua'

Validator.localize(ua);

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: {
     ru: ru,
     en: en,
     ua: ua
   },
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'validate-fields',
  i18n, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false
};

Vue.use(Navbar);
Vue.use(Form);
Vue.use(Button);
Vue.use(FormGroup);
Vue.use(FormInput);
Vue.use(Layout);

// Vue.use(ElementUI);
Vue.use(VeeValidate, config);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  i18n,
  render: h => h(App)
})
