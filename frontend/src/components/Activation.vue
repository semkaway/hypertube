<template>
  <div>
		<b-alert  variant="success"
              :show="dismissCountDown"

              class="mt-3">
      <h3>{{ $t('activation.success_title')}}</h3>
      <p>{{ $t('activation.success_alert')}}</p>
      <!-- <p>{{$t('activation.redirect_success_text')}}{{dismissCountDown}}{{$t('activation.redirect_seconds')}}</p> -->
            <b-button :to="'/login'" variant="warning">{{$t('button.login')}}</b-button>
    </b-alert>
      <b-alert  variant="danger"
                :show="dismissCountDown1"

                class="mt-3">
          <h3>{{ $t('activation.error_title')}}</h3>
          <p>{{ $t('activation.error_alert')}}</p>
          <!-- <p>{{$t('activation.redirect_error_text')}}{{dismissCountDown1}}{{$t('activation.redirect_seconds')}}</p> -->
          <b-button :to="'/'" variant="secondary">{{$t('button.home')}}</b-button>
      </b-alert>
      <b-alert  variant="danger"
                :show="dismissCountDown2"

                class="mt-3">
          <h3>{{ $t('activation.error_title')}}</h3>
          <p>{{ $t('activation.invalid_alert')}}</p>
          <!-- <p>{{$t('activation.redirect_error_text')}}{{dismissCountDown2}}{{$t('activation.redirect_seconds')}}</p> -->
          <b-button :to="'/'" variant="secondary">{{$t('button.home')}}</b-button>
      </b-alert>

  </div>
</template>

<script>

import {HTTP} from '../http-common';

export default {
  name: 'Activation',
  data () {
    return {
        dismissCountDown: 0,
        dismissCountDown1: 0,
        dismissCountDown2: 0
      }
    },
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const myToken = urlParams.get('token');
      const myEmail = urlParams.get('email');

      HTTP
        .post(`user/activate`, {
          "email": myEmail,
          "token": myToken
        })
        .then(response => {
          console.log(response.data.message)
          if (response.data.success == true) {
            this.dismissCountDown = true
          } else if (response.data.success == false && (response.data.message != "Invalid email" && response.data.message != "Invalid token")) {
              this.dismissCountDown1 = true
          } else {
                this.dismissCountDown2 = true
          }
        })
        .catch(() => {
          console.log(err.response.data.error.message)
          console.log("server error")
        })
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
