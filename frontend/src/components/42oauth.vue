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
      const myCode = urlParams.get('code');
      const accessDenied = urlParams.get('error');

      if(myCode == null && accessDenied == null) {
        console.log('invalid data')
        this.$router.push('/')
      } else if (myCode != null && accessDenied == null) {
        console.log('not null')
        // HTTP
        //   .post(`user/activate`, {
        //     "code": myCode,
        //   })
        //   .then(response => {
        //     console.log(response.data.message)
        //     if (response.data.success == true) {
        //       console.log('code recieved')
        //       setTimeout(() => { this.$router.push('login') }, 5000)
        //     } else {
        //       console.log('code not recieved')
        //       setTimeout(() => { this.$router.push('login') }, 5000)
        //     }
        //   })
        //   .catch(() => {
        //     console.log("can't connect to server")
        //   })
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
