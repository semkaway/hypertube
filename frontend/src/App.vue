<template>
	 <v-app>
		<app-header
			v-bind:user='user'
			v-bind:token='token'
			v-bind:locale='locale'
			v-on:setTokenAndLocale='setTokenAndLocale'
		/>
<<<<<<< HEAD
		<router-view
			v-bind:user='user'
			v-bind:token='token'
=======
		<router-view 
			v-bind:user='user' 
			v-bind:token='token' 
>>>>>>> a7b6d350835c29e6c1791d4721c13bb2e9777b7f
			v-bind:locale='locale'
			v-on:setUser='setUser'
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
		setTokenAndLocale (response) {
			this.token = response.token
			this.locale = response.locale
			this.$router.push('/movies')
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
