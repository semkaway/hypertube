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
			path: '/',
			component: Home,
			// props: true,
		},
		{
			path: '/movies',
			component: Movies,
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
		},
		{
			path: '/user/settings',
			name: 'userSettings',
			component: UserSettings,
			props: true,
		},
	]
})

export default router
