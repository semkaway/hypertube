<template>
	 <v-app>
		<app-header 
			v-bind:user='user' 
			v-bind:token='token' 
			v-bind:locale='locale'  
			v-on:setTokenAndLocale='setTokenAndLocale'
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
			token: localStorage.getItem('token'),
			locale: localStorage.getItem('locale'),
		}
	},
	methods: {
		setTokenAndLocale (response) {
			this.token = response.token
			this.locale = response.locale
			this.$router.push('/movies')
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
