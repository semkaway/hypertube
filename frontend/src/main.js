import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { 	Navbar,
					Form,
					Button,
					FormGroup,
					FormInput,
					Layout,
					Modal,
					Alert,
					Carousel,
					ListGroup,
					Image } from 'bootstrap-vue/es/components'
// import { Scrollspy } from 'bootstrap-vue/es/directives';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App'
import router from './router'
import i18n from './locale'
import VeeValidate, { Validator } from 'vee-validate'
import ru from './locale/ru'
import en from 'vee-validate/dist/locale/en'
import uk from './locale/uk'
import setAuthorizationToken from './utils/setAuthToken'

Validator.localize(uk);
Validator.localize(ru);

const config = {
	aria: true,
	classNames: {},
	classes: false,
	delay: 0,
	dictionary: {
		 ru: ru,
		 en: en,
		 uk: uk
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
Vue.use(Modal);
Vue.use(Alert);
Vue.use(Carousel);
// Vue.use(Scrollspy);
Vue.use(ListGroup);
Vue.use(Image);

Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

// Vue.use(VueAxios, axios);
// Vue.use(HTTP);

Vue.use(VeeValidate, config);
Vue.config.productionTip = false

setAuthorizationToken(localStorage.token)

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
