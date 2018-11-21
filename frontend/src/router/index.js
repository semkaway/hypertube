import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Registration from '@/components/Registration'
import Activation from '@/components/Activation'
import Login from '@/components/Login'
import RestorePassword from '@/components/RestorePassword'
import UserProfile from '@/components/UserProfile'
import UserSettings from '@/components/UserSettings'
import oauth from '@/components/Oauth'

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
				path: '/intra',
				name: 'oauth42',
				component: oauth
		},
		{
				path: '/github',
				name: 'oauthGit',
				component: oauth
		},
		// {
		// 		path: '/oauth42',
		// 		name: 'oauthGeneral42',
		// 		component: oauth
		// },
		// {
		// 		path: '/oauthgit',
		// 		name: 'oauthGeneralGit',
		// 		component: oauth
		// },
		{
			path: '/user',
			name: 'userProfile',
			component: UserProfile,
			meta: {
      		requiresAuth: true
    	}
		},
		{
			path: '/user/settings',
			name: 'userSettings',
			component: UserSettings,
			meta: {
      		requiresAuth: true
    	}
		},
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
            next({ path: '/user/profile'})
        }
    } else {
        next()
    }
})

export default router
