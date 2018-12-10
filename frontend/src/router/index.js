import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Movies from '@/components/Movies'
import Movie from '@/components/Movie'
import Activation from '@/components/Activation'
import UserProfile from '@/components/UserProfile'
import UserSettings from '@/components/UserSettings'
import NotFound from '@/components/NotFound'
import Oauth from '@/components/Oauth'

Vue.use(Router)

let router = new Router({
	mode: 'history',
	base: __dirname,
	routes: [
		{
			path: '/',
			component: Home,
			props: true,
		},
		{
			path: '/movies',
			component: Movies,
			props: true,
			// meta: {requiresAuth: true}
		},
		{
			path: '/movies/:id',
			component: Movie,
			props: true,
			// meta: {requiresAuth: true}
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
			component: Oauth
		},
		{
			path: '/github',
			name: 'oauthGit',
			component: Oauth
		},
		{
			path: '/profile/:id',
			name: 'userProfile',
			props: true,
			component: UserProfile,
			// meta: {requiresAuth: true}
		},
		{
			path: '/user/settings',
			name: 'userSettings',
			component: UserSettings,
			props: true,
			// meta: {requiresAuth: true}
		},
		{
			path: '/404',
			name: 'NotFound',
			component: NotFound,
			props: true
		},
		// {
		// 	path: '*',
		// 	redirect: '/404' 
		// }, 
	]
})

// router.afterEach((to, fromRoute, next) => {
// 	if (to.matched.some(record => record.meta.requiresAuth)) {
// 		console.log('window.userLoggedIn', window.userLoggedIn)
// 	  if (!window.userLoggedIn) {
// 		  if (to.path === '/movies' || to.path.slice(0, 8) === '/movies/' || to.path === '/activate/' ||  to.path.slice(0, 9) === '/profile/' || to.path === '/user/settings') {
// 				// next({ path: '/404' })
// 				// this.router.push('/404')
// 				console.log('redirect to 404 because user.loggedin ? ', window.userLoggedIn)
// 		  } 
// 	  }
// 	}
//   })

export default router
