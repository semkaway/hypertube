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

import AppHeader from './components/includes/TheHeader.vue'
import AppFooter from './components/includes/TheFooter.vue'
import Home from './components/Home'
import Registration from './components/Registration'
import Confirmation from './components/Confirmation'
import Login from './components/Login'
export default {
  name: 'App',
  components: {
    Home,
    Registration,
    Confirmation,
    Login,
    'app-header': AppHeader,
    'app-footer': AppFooter
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
  	min-height: calc(100vh - 40px);
}

#footer {
    width: 100%;
    background-color: #545c64;
    height: 40px;
}

a {
  text-decoration: none;
}
</style>
