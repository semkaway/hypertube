<template>
  <div>
		<h1>Hello from user page!</h1>
    <b-button variant="danger" @click="logout">Log out</b-button>
  </div>
</template>

<script>

import {HTTP} from '../http-common';

export default {
  name: 'UserPage',
  data () {
    return {

      }
    },
    mounted() {

      },
      methods: {
        logout() {
          localStorage.token = ''
          this.$router.push('/')
        }
      }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
