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
          <h1>{{ $t('forgot_password.error_title')}}</h1>
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
          <h1>{{ $t('forgot_password.error_title')}}</h1>
          <p>{{ $t('activation.invalid_alert')}}</p>
          <p>{{$t('activation.redirect_error_text')}}{{dismissCountDown2}}{{$t('activation.redirect_seconds')}}</p>
          <b-button :to="'/'" variant="secondary">{{$t('button.home')}}</b-button>
      </b-alert>
    <b-row>
			<b-col sm="3" lg="4"></b-col>
			<b-col sm="5" lg="4" class="mt-4 mb-5" :class="{'hideForm': hideForm}">
				<h1>{{ $t('forgot_password.title')}}</h1>
				<b-form @submit="onSubmit" class="mt-4">
					<b-form-group :label="$t('registration.password')"
												:error="errors.first('password')"
												:description="$t('registration.password_hint')"
												class="font-weight-bold">
						<b-form-input name="password"
													ref="passwordRef"
													type="password"
													v-model="restorePassForm.password"
													v-bind:placeholder="$t('registration.password')"
													data-vv-as=" "
													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
													:class="{'form-control': true, 'error': errors.has('password') }">
						</b-form-input>
						<span>{{ errors.first('password') }}</span>
					</b-form-group>
					<b-form-group :label="$t('registration.repeat_password')"
												class="font-weight-bold">
							<b-form-input name="repeat_password"
												type="password"
												v-model="restorePassForm.repeat_password"
												v-bind:placeholder="$t('registration.repeat_password')"
												data-vv-as=" "
												v-validate="'required|confirmed:passwordRef'"
												:class="{'form-control': true, 'error': errors.has('repeat_password') }">
							</b-form-input>
							<span>{{ errors.first('repeat_password') }}</span>
					</b-form-group>
					<b-button type="submit" variant="warning">{{$t('button.submit')}}</b-button>
				</b-form>
			</b-col>
			<b-col sm="3" lg="4"></b-col>
		</b-row>
    </div>
</template>

<script>

import {HTTP} from '../http-common';

export default {
  name: 'RestorePassword',
  data () {
    return {
      restorePassForm: {
        password: '',
        repeat_password: ''
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissCountDown1: 0,
      dismissCountDown2: 0,
      hideForm: true
    }
  },
  methods: {
    onSubmit(evt) {
        evt.preventDefault();
        this.$validator.validateAll()
        .then(result => {
          if(!result) {
            console.log('error')
            return false
          } else {
            const urlParams = new URLSearchParams(window.location.search);

            const myEmail = urlParams.get('email');
            const myToken = urlParams.get('token');
            HTTP
              .post('user/password/change', {
                'email': myEmail,
                'token': myToken,
                'password': this.restorePassForm.password
              })
              .then (response => {
                if (response.data.success == true) {
                  this.hideForm = true
                  this.dismissCountDown = this.dismissSecs
                  setTimeout(() => { this.$router.push('login') }, 5000)
                } else {
                  this.hideForm = true
                  this.dismissCountDown1 = this.dismissSecs
                  setTimeout(() => { this.$router.push('/') }, 5000)
                }
              })
          }
        })
        .catch(() => {
          console.log('error')
        })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    countDownChanged1 (dismissCountDown1) {
          this.dismissCountDown1 = dismissCountDown1
    },
    countDownChanged2 (dismissCountDown2) {
      this.dismissCountDown2 = dismissCountDown2
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);

    const myEmail = urlParams.get('email');
    const myToken = urlParams.get('token');
    HTTP
      .get(`user/password/token-check?email=`+myEmail+`&token=`+myToken)
      .then(response => {
        console.log(response.data)
        if (response.data.success == true) {
          this.hideForm = false
        } else if (response.data.success == false && (response.data.message != "Invalid email" && response.data.message != "Invalid token")) {
            this.dismissCountDown1 = this.dismissSecs
            setTimeout(() => { this.$router.push('/') }, 5000)
        } else {
              this.dismissCountDown2 = this.dismissSecs
              setTimeout(() => { this.$router.push('/') }, 5000)
        }
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hideForm {
  display: none;
}

.form-control.error {
	border-color: #E84444;
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(232,68,68,.6);
}

.form-control.error:focus {
	border-color: #E84444;
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(232,68,68,.6);
}

.form-control:focus {
	border-color: #207c23;
	box-shadow: 0 1px 1px rgba(33, 153, 37,.075), 0 0 8px rgba(33, 153, 37, 0.6);
}

span {
	color: red;
	font-size: 0.8rem;
	font-weight: normal;
}

</style>
