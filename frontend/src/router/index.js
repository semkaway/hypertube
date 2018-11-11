import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Registration from '@/components/Registration'
import Activation from '@/components/Activation'
import Login from '@/components/Login'
import RestorePassword from '@/components/RestorePassword'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: __dirname,
	routes: [
		{
				path: '/',
				name: 'Home',
				component: Home
		},
		{
				path: '/register',
				name: 'Registration',
				component: Registration,
				// meta: { 
				//   guest: true
				// }
		},
		{
				path: '/login',
				name: 'Login',
				component: Login,
				// meta: { 
				//   guest: true
				// }
		},
		{ //DELETE AFTER
				path: '/activate/',
				name: 'Activation',
				component: Activation
		},
		{ //DELETE AFTER
				path: '/restore_password',
				name: 'RestorePassword',
				component: RestorePassword
		},
	]
})
