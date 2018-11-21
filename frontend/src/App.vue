<template>
		<div id="app">
				<div class="container-fluid">
					<app-header></app-header>
					<router-view/>
				</div>
				<app-footer></app-footer>
		</div>
</template>

<script>

import AppHeader from './components/includes/TheHeader'
import AppFooter from './components/includes/TheFooter.vue'

export default {
	name: 'App',
	components: {
		'app-header': AppHeader,
		'app-footer': AppFooter,
	},
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	display: block;
	position: relative;
	height: 100%;
	color: #2c3e50;
}

.container-fluid {
		min-height: calc(100vh - 80px);
}

#footer {
		width: 100%;
		background-color: #545c64;
		height: 80px;
}

a {
	text-decoration: none;
}

h1 {
	text-transform: full-width;
}

</style>
