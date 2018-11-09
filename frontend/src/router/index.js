import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Registration from '@/components/Registration'
import Confirmation from '@/components/Confirmation'
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
  	    component: Registration
  	},
    {
  	    path: '/login',
      	name: 'Login',
  	    component: Login
  	},
    { //DELETE AFTER
  	    path: '/confirm',
      	name: 'Confirmation',
  	    component: Confirmation
  	},
    { //DELETE AFTER
  	    path: '/restore_password',
      	name: 'RestorePassword',
  	    component: RestorePassword
  	},
	]
})
