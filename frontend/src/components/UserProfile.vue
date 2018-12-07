<template>
  <div>
    <b-row>
      <b-col sm="5" lg="4" class="mt-4">
        <h1>{{user.first_name}} {{user.last_name}}</h1>
        <b-img :src='user.image' width="300" fluid /></b-col>
      <b-col sm="3" lg="4">
      </b-col>
      <b-col sm="3" lg="4"></b-col>
    </b-row>



  </div>
</template>

<script>

import {HTTP} from '../http-common';

export default {
  name: 'UserPage',
  data () {
    return {
      user: {
          first_name: '',
          last_name: '',
          email: '',
          pendingEmail: '',
          image: '',
          password: '',
          intra: '',
          github: ''
        }
      }
    },
      mounted() {
        HTTP
          .get('user/data/')
          .then(result => {
            console.log(result)
            if (result.data.success == true) {
              this.user.first_name = result.data.first
              this.user.last_name = result.data.last
              this.user.email = result.data.email
              this.user.pendingEmail = result.data.pendingEmail
              this.user.image = result.data.image
              this.user.password = result.data.password
              this.user.intra = result.data.intra
              this.user.github = result.data.github
              console.log("email: "+this.user.email+" pendingEmail: "+this.user.pendingEmail+" intra: "+this.user.intra+" git: "+this.user.github+" pass: "+this.user.password)
              if (this.user.image === null) {
                this.user.image = "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              }
            } else if (result.data.success == false) {
              localStorage.token = ''
              this.$router.push('/')
            }
          })
          .catch((err) => {
            console.log(err)
            localStorage.token = ''
            this.$router.push('/')
          })
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
