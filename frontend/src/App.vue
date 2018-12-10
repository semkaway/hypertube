<template>
	 <v-app>
		<app-header 
			v-bind:user='user' 
			v-bind:token='token' 
			v-bind:locale='locale'
			v-on:setUser='setUser'
			v-on:setTokenAndLocale='setToken'
			v-on:setUserStatus='setUserStatus'
			v-bind:userLoggedIn='userLoggedIn'
		/>
		<router-view
			v-bind:user='user'
			v-bind:token='token'
			v-on:setUser='setUser'
			v-bind:locale='locale'
			v-on:setLocale='setLocale'
			v-on:updateUser='updateUser'
			v-on:setTokenAndLocale='setToken'
		/>
	</v-app>
</template>

<script>

import AppHeader from './components/includes/TheHeader'
import AppFooter from './components/includes/TheFooter'
const defaultImage = 'http://www.studioclio.com.br/sites/default/files/imagens/evento/pitagoras_0.jpg'


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
			userLoggedIn: false
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

		setUserStatus (status) {
			this.userLoggedIn = status
			window.userLoggedIn = status
		},

		setUser (response) {
			let { email, first, last, image, user_id, pendingEmail, password, intra, github } = response
			if (!image) image = defaultImage
			this.user = { email, first, last, image, user_id, pendingEmail, password, intra, github }
		},

		updateUser(updatedUser) {
			if (!updatedUser) {
				window.userLoggedIn = false
				this.userLoggedIn = false
				this.user = {}
			} else {
				this.userLoggedIn = true
				window.userLoggedIn = true
				this.user = Object.assign(this.user, updatedUser)
			}
			console.log('updated user', this.user)
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
