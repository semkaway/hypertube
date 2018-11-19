<template>
  <div>

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
      const urlParams = new URLSearchParams(window.location.search);
      const currUrl = window.location.pathname
      const myCode = urlParams.get('code');
      const accessDenied = urlParams.get('error');

      if(myCode == null && accessDenied == null) {
        console.log('invalid data')
        this.$router.push('/')
      } else if (myCode != null && accessDenied == null) {
        console.log('not null')
        HTTP
          .post(`user/oauth`+currUrl, {
            "code": myCode,
            "locale": this.$i18n.locale
          })
          .then(response => {
            console.log(response.data)
            if (response.data.success == true) {
              this.$i18n.locale = response.data.locale
              localStorage.locale = response.data.locale
              localStorage.token = response.data.token
              this.$router.push('/')
            } else {
              console.log('code not recieved')
              this.$router.push('login?fail=true')
            }
          })
          .catch(() => {
            console.log("can't connect to server")
          })
      } else if (myCode == null && accessDenied != null) {
          console.log('access denied')
          this.$router.push('/')
      } else {
          console.log('something weird just happened')
          this.$router.push('/')
      }


      },
      methods: {

      }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
