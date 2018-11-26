<template>
  <div>

  </div>
</template>

<script>

import {HTTP} from '../http-common';
import setAuthorizationToken from '../utils/setAuthToken'


export default {
  name: 'UserPage',
  data () {
    return {

      }
    },
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const currUrl = window.location.pathname
      const myCode = urlParams.get('code');
      const accessDenied = urlParams.get('error');
      console.log("token: "+localStorage.token)

      if(myCode == null && accessDenied == null) {
        console.log('invalid data')
        localStorage.token = ''
        this.$router.push('/')
      } else if (myCode != null && accessDenied == null) {
        console.log('not null')
        if (localStorage.token !== '') {
          console.log('adding')
          HTTP
            .post(`user/add`+currUrl, {
              "code": myCode
              // "token": localStorage.token
            })
            .then(response => {
              if (response.data.success == true) {
                console.log('all good')
                this.$router.push('/user/settings')
              } else if (response.data.message == "Invalid token") {
                localStorage.token = ''
                this.$router.push('/')
              } else if (response.data.message == "User exist") {
                this.$router.push('/user/settings')
                console.log('this user already exists')
              }
            })
            .catch((err) => {
              console.log("server error")
              console.log(err.response.data.error.message)
              this.$router.push('/')
            })
        }
        else {
          HTTP
            .post(`user/oauth`+currUrl, {
              "code": myCode,
              "locale": this.$i18n.locale
            })
            .then(response => {
              if (response.data.success == true) {
                this.$i18n.locale = response.data.locale
                localStorage.locale = response.data.locale
                localStorage.token = response.data.token
                setAuthorizationToken(response.data.token)
                this.$router.push('/')
              } else {
                console.log('code not recieved')
                this.$router.push('login?fail=true')
              }
            })
            .catch((err) => {
              console.log("server error")
              console.log(err.response.data.error.message)
              this.$router.push('/')
            })
        }
      } else if (myCode == null && accessDenied != null) {
        console.log('access denied')
        if (localStorage.token === '') {
          this.$router.push('login?fail=true')
        } else {
          this.$router.push('user/settings')
        }
      } else {
          console.log('something weird just happened')
          localStorage.token = ''
          this.$router.push('/')
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
