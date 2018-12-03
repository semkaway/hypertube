import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Movies from '@/components/Movies'
import Movie from '@/components/Movie'
import Activation from '@/components/Activation'
import UserProfile from '@/components/UserProfile'
import UserSettings from '@/components/UserSettings'
import oauth from '@/components/Oauth'
import axios from 'axios'

Vue.use(Router)

let router = new Router({
	mode: 'history',
	base: __dirname,
	routes: [
		{
<<<<<<< HEAD
				path: '/',
				component: localStorage.getItem('token') ?  Movies : Home ,
				// meta: {
				// requiresAuth: true,
	    	// }
=======
			path: '/',
			component: Home,
			props: true,
		},
		{
			path: '/movies',
			component: Movies,
			props: true,
	
>>>>>>> 7bfc922e29803b48fad83e9d9d71f61b82cc61f4
		},
		{
				path: '/movies/:id',
				component: Movie,
				props: true,
				meta: {
	      			requiresAuth: true
	    		}
		},
		{
				path: '/activate',
				name: 'activation',
				props: true,
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
			props: true,
			component: UserProfile,
			meta: {
      			requiresAuth: true
    		}
		},
		{
			path: '/user/settings',
			name: 'userSettings',
			component: UserSettings,
			props: true,
			meta: {
      			requiresAuth: true
    		}
		},
	]
})

<<<<<<< HEAD
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
			console.log('yo')
        if (localStorage.getItem('token') == '') {
            next(false)
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
=======
router.beforeEach((to, fromRoute, next) => {
	console.log('to =>', to)
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!axios.defaults.headers.common['Authorization']) {
			console.log('set path to /')
			next({ path: '/'})
		}
	} else {
>>>>>>> 7bfc922e29803b48fad83e9d9d71f61b82cc61f4
        next()
	}
})

export default router
