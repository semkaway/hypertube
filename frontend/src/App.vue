l<template>
	 <v-app>
	 	<app-snackbar :show='showSnackbar' :text='snackbarText' y='bottom' x='right' v-on:closeSnackbar='showSnackbar = false' timeout='2500' />
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
			v-bind:searchAppText='searchAppText'
			v-bind:searchAppParams='searchAppParams'
			v-on:setSearchParams='setSearchParams'
			v-on:setUser='setUser'
			v-bind:locale='locale'
			v-on:setLocale='setLocale'
			v-on:updateUser='updateUser'
			v-on:setTokenAndLocale='setToken'
			v-bind:userLoggedIn='userLoggedIn'
			v-on:userAdded='userAdded'
			v-on:userAlreadyExists='showWarning'
			v-on:userActivate='userActivate'
			v-bind:userAppSetDate='userAppSetDate'
		/>
		<app-footer />
	</v-app>
</template>

<script>

import AppHeader from './components/includes/TheHeader'
import AppFooter from './components/includes/TheFooter'
import Snackbar from './components/Snackbar'
const defaultImage = 'http://www.studioclio.com.br/sites/default/files/imagens/evento/pitagoras_0.jpg'

export default {
	name: 'App',
	components: {
		'app-header': AppHeader,
		'app-footer': AppFooter,
		'app-snackbar': Snackbar,
	},
	data: () => {
		return {
			user: {},
			token: localStorage.token,
			locale: 'en',
			userLoggedIn: false,
			showSnackbar: false,
			snackbarText: '',
			searchAppParams: {
				'release_date.gte': 2000,
				'release_date.lte': 2018,
				'with_genres': '',
				'sort_by': ''
			},
			searchAppText: '',
			userAppSetDate: false
		}
	},
	methods: {

		setSearchParams(params, text, dateChanged) {
			this.searchAppParams = Object.assign(this.searchAppParams, params)
			this.searchAppText = text
			if (dateChanged)
				this.userAppSetDate = dateChanged
		},

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
		},

		setUser (response) {
			let { email, first, last, image, user_id, pendingEmail, password, intra, github } = response
			if (!image) image = defaultImage
			this.user = { email, first, last, image, user_id, pendingEmail, password, intra, github }
		},

		updateUser(updatedUser) {
			if (!updatedUser) {
				this.userLoggedIn = false
				this.user = {}
			} else {
				this.userLoggedIn = true
				this.user = Object.assign(this.user, updatedUser)
			}
		},

		userAdded() {
			this.showSnackbar = true
			this.snackbarText = this.$t('profile.success_alert')
		},

		showWarning() {
			this.showSnackbar = true
			this.snackbarText = this.$t('profile.settings.userExists')
		},

		userActivate(message) {
			this.showSnackbar = true
			this.snackbarText = this.$t(message)
		},

		setDefaultLocale(locale) {
			if (locale == 'en' || locale == 'ru' || locale == 'uk')
                this.$i18n.locale = locale
            else {
                localStorage.locale = 'en'
                this.$i18n.locale = 'en'
            }
		}
	},

	created() {
		this.setDefaultLocale(this.locale)
	},

	watch: {
		locale(newValue) {
			this.setDefaultLocale(newValue)
		}
	}
}
</script>

<style>
 html, body, #app {
      min-height: 100%;
			font-family: 'Maven Pro', sans-serif;
    }

	body {
		position: relative;
		 min-height: 100%;
		 box-sizing: border-box;
	}
</style>
