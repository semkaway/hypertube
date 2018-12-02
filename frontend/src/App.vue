<template>
	 <v-app>
		<app-header></app-header>
		<router-view />
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
}
</script>

<style>
 html, body, #app {
      height: 100%;
      min-height: 100%;
      font-family: Roboto;
    }
</style>
