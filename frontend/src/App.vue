<template>
	 <v-app>
		<app-header 
			v-bind:user='user' 
			v-bind:token='token' 
			v-bind:locale='locale'  
			v-on:setUser='setUser'
			v-on:setTokenAndLocale='setToken'
			v-on:setLocale='setLocale'
		/>
		<router-view
			v-bind:user='user'
			v-bind:token='token'
			v-bind:locale='locale'
		/>
	</v-app>
</template>

<script>

import AppHeader from './components/includes/TheHeader'
import AppFooter from './components/includes/TheFooter'

export default {
	name: 'App',
	components: {
		'app-header': AppHeader,
		'app-footer': AppFooter,
	},
	data: () => {
		return {
			user: {},
			token: localStorage.token,
			locale: localStorage.locale ? localStorage.locale : 'en',
		}
	},
	methods: {
		setToken (response) {
			this.token = response.token
			this.setLocale(response.locale)
			this.$router.push('/movies')
		},

		setLocale (locale) {
			this.locale = locale
		},

		setUser (response) {
			let { email, first, last, image } = response
			this.user = { email, first, last, image }
		}
	}
}
</script>

<style>
 html, body, #app {
      height: 100%;
      min-height: 100%;
      font-family: Roboto;
    }
</style>
