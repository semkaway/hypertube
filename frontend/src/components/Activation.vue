<template>
  <div>
		<b-alert  variant="success"
              :show="dismissCountDown"
              dismissible
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
              class="mt-3">
      <h1>{{ $t('activation.success_title')}}</h1>
      <p>{{ $t('activation.success_alert')}}</p>
      <p>{{$t('activation.redirect_success_text')}}{{dismissCountDown}}{{$t('activation.redirect_seconds')}}</p>
            <b-button :to="'/login'" variant="warning">{{$t('button.login')}}</b-button>
    </b-alert>
      <b-alert  variant="danger"
                :show="dismissCountDown1"
                dismissible
                @dismissed="dismissCountDown1=0"
                @dismiss-count-down="countDownChanged1"
                class="mt-3">
          <h1>{{ $t('activation.error_title')}}</h1>
          <p>{{ $t('activation.error_alert')}}</p>
          <p>{{$t('activation.redirect_error_text')}}{{dismissCountDown1}}{{$t('activation.redirect_seconds')}}</p>
          <b-button :to="'/'" variant="secondary">{{$t('button.home')}}</b-button>
      </b-alert>
      <b-alert  variant="danger"
                :show="dismissCountDown2"
                dismissible
                @dismissed="dismissCountDown1=0"
                @dismiss-count-down="countDownChanged2"
                class="mt-3">
          <h1>{{ $t('activation.error_title')}}</h1>
          <p>{{ $t('activation.invalid_alert')}}</p>
          <p>{{$t('activation.redirect_error_text')}}{{dismissCountDown2}}{{$t('activation.redirect_seconds')}}</p>
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
        dismissSecs: 5,
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
            this.dismissCountDown = this.dismissSecs
            setTimeout(() => { this.$router.push('login') }, 5000)
          } else if (response.data.success == false && (response.data.message != "Invalid email" && response.data.message != "Invalid token")) {
              this.dismissCountDown1 = this.dismissSecs
              setTimeout(() => { this.$router.push('/') }, 5000)
          } else {
                this.dismissCountDown2 = this.dismissSecs
                setTimeout(() => { this.$router.push('/') }, 5000)
          }
        })
        .catch(() => {
          console.log("can't connect to server")
        })
      },
      methods: {
        countDownChanged (dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },
        countDownChanged1 (dismissCountDown1) {
            this.dismissCountDown1 = dismissCountDown1
        },
        countDownChanged2 (dismissCountDown2) {
          this.dismissCountDown2 = dismissCountDown2
        },
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
