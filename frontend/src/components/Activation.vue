<template>
  <div>
		<b-alert  variant="success"
              :show="dismissCountDown"
              class="mt-3">
        <div v-if="token === ''">
          <h1>{{ $t('activation.success_title')}}</h1>
          <p>{{ $t('activation.success_alert')}}</p>
          <b-button :to="'/login'" variant="warning">{{$t('button.login')}}</b-button>
        </div>
        <div v-if="token !== ''">
          <h1>{{ $t('activation.new_success_title')}}</h1>
          <b-button :to="'/user'" variant="warning">{{$t('button.profile')}}</b-button>
        </div>
    </b-alert>
      <b-alert  variant="danger"
                :show="dismissCountDown1"
                class="mt-3">
          <h1>{{ $t('activation.error_title')}}</h1>
          <p>{{ $t('activation.error_alert')}}</p>
          <b-button :to="'/'" variant="secondary">{{$t('button.home')}}</b-button>
      </b-alert>
      <b-alert  variant="danger"
                :show="dismissCountDown2"
                class="mt-3">
          <h1>{{ $t('activation.error_title')}}</h1>
          <p>{{ $t('activation.invalid_alert')}}</p>
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
        dismissCountDown2: 0,
        token: localStorage.getItem('token')
      }
    },
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const myToken = urlParams.get('token');

      HTTP
        .post(`user/activate`, {
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
        .catch((err) => {
          console.log(err.response.data.error.message)
          console.log("server error")
        })
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 1.5rem;
}
</style>
