<template>
  <div>
    <b-alert  variant="success"
              :show="dismissCountDown"
              class="mt-3">
      <h3>{{ $t('activation.success_title')}}</h3>
      <p>{{ $t('activation.success_alert')}}</p>
            <b-button :to="'/login'" variant="warning">{{$t('button.login')}}</b-button>
    </b-alert>
      <b-alert  variant="danger"
                :show="dismissCountDown1"
                class="mt-3">
          <h3>{{ $t('forgot_password.error_title')}}</h3>
          <p>{{ $t('activation.error_alert')}}</p>
          <b-button :to="'/'" variant="secondary">{{$t('button.home')}}</b-button>
      </b-alert>
      <b-alert  variant="danger"
                :show="dismissCountDown2"
                class="mt-3">
          <h3>{{ $t('forgot_password.error_title')}}</h3>
          <p>{{ $t('activation.invalid_alert')}}</p>
          <b-button :to="'/'" variant="secondary">{{$t('button.home')}}</b-button>
      </b-alert>
    <b-row>
			<b-col sm="3" lg="4"></b-col>
			<b-col sm="5" lg="4" class="mt-4 mb-5" :class="{'hideForm': hideForm}">
				<h2>{{ $t('forgot_password.title')}}</h2>
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
                  this.dismissCountDown = true
                } else {
                  this.hideForm = true
                  this.dismissCountDown1 = true
                }
              })
              .catch(() => {
                console.log(err.response.data.error.message)
                console.log("server error")
              })
          }
        })
        .catch(() => {
          console.log('error')
        })
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);

    const myEmail = urlParams.get('email');
    const myToken = urlParams.get('token');


    HTTP
      .post(`user/password/token-check`, {
        "email": myEmail,
        "token": myToken
      })
      .then(response => {
        console.log(response)
        if (response.data.success == true) {
          this.hideForm = false
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
