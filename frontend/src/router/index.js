import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Movies from '@/components/Movies'
import Movie from '@/components/Movie'
import Activation from '@/components/Activation'
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
				component: Home,
				name: 'home',
				meta: {
				  homePage: true
				}
		},
		{
				path: '/movies',
				component: Movies,
				meta: {
	      		requiresAuth: true
	    	}
		},
		{
				path: '/movies/:id',
				component: Movie,
				meta: {
	      		requiresAuth: true
	    	}
		},
		{
				path: '/activate',
				name: 'activation',
				component: Activation
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
            next({ path: '/user'})
        }
    } else if(to.matched.some(record => record.meta.homePage)) {
        if(localStorage.getItem('token') == ''){
            next()
        }
        else{
            next({ path: '/movies'})
        }
    } else {
        next()
    }
})

export default router
