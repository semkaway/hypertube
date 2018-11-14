import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Registration from '@/components/Registration'
import Activation from '@/components/Activation'
import Login from '@/components/Login'
import RestorePassword from '@/components/RestorePassword'
import UserPage from '@/components/UserPage'

Vue.use(Router)

let router = new Router({
	mode: 'history',
	base: __dirname,
	routes: [
		{
				path: '/',
				name: 'home',
				component: Home
		},
		{
				path: '/register',
				name: 'registration',
				component: Registration,
				meta: {
				  guest: true
				}
		},
		{
				path: '/login',
				name: 'login',
				component: Login,
				meta: {
				  guest: true
				}
		},
		{
				path: '/activate',
				name: 'activation',
				component: Activation
		},
		{
				path: '/reset-password',
				name: 'restorepassword',
				component: RestorePassword
		},
		{
			path: '/user',
			name: 'userpage',
			component: UserPage,
			meta: {
          requiresAuth: true
        }
		}

	]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == '') {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
					}
        else {
              next()
          }
    }
		else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('token') == ''){
            next()
        }
        else{
            next({ path: '/user'})
        }
    } else {
        next()
    }
})

export default router
