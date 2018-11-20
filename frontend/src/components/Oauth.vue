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

      // if (currUrl === '/oauth42') {
      //   window.location.href = 'https://api.intra.42.fr/oauth/authorize?' +
      //   'client_id=5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7' +
      //   '&redirect_uri=http://localhost:8084/intra&response_type=code'
      // }
      // if (currUrl === '/oauthgit') {
      //   window.location.href = 'https://api.intra.42.fr/oauth/authorize?' +
      //   'client_id=5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7' +
      //   '&redirect_uri=http://localhost:8084/intra&response_type=code'
      // }

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
            if (response.data.success == true) {
              this.$i18n.locale = response.data.locale
              localStorage.locale = response.data.locale
              localStorage.token = response.data.token
              this.$router.push('/')
              // opener.postMessage({ result: 'awesome' }, location.origin);
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
      } else if (myCode == null && accessDenied != null) {
          console.log('access denied')
          this.$router.push('login?fail=true')
      } else {
          console.log('something weird just happened')
          this.$router.push('/')
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
