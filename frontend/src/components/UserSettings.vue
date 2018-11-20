<template>
  <div>
    <b-row>
			<b-col sm="3" lg="4"></b-col>
			<b-col sm="5" lg="4">
				<b-alert 	variant="success"
									dismissible
									:show="showSuccessAlert"
									class="mt-3">{{$t('profile.success_alert')}}
				</b-alert>
				<b-alert 	variant="danger"
									dismissible
									:show="showErrorAlert"
									class="mt-3">{{$t('login.error_alert')}}
				</b-alert>
			</b-col>
			<b-col sm="3" lg="4"></b-col>
		</b-row>
    <b-row>
      <b-col sm="3" lg="4"></b-col>
      <b-col sm="5" lg="4" class="mt-4">
        <h1 class="text-left">{{ $t('profile.settings.change_password') }}</h1>
        <b-form @submit="onSubmitPass" class="mt-4">
          <b-form-group :label="$t('profile.settings.old_password')"
												:error="errors.first('password')"
												class="font-weight-bold">
						<b-form-input name="old_password"
													type="password"
													v-model="settings.old_password"
													v-bind:placeholder="$t('profile.settings.old_password')"
													data-vv-as=" "
													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
													:class="{'form-control': true, 'error': errors.has('old_password') }">
						</b-form-input>
            <span>{{ errors.first('old_password') }}</span>
          </b-form-group>
					<b-form-group :label="$t('profile.settings.new_password')"
												:error="errors.first('password')"
												:description="$t('registration.password_hint')"
												class="font-weight-bold">
						<b-form-input name="new_password"
													ref="passwordRef"
													type="password"
													v-model="settings.new_password"
													v-bind:placeholder="$t('profile.settings.new_password')"
													data-vv-as=" "
													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
													:class="{'form-control': true, 'error': errors.has('new_password') }">
						</b-form-input>
						<span>{{ errors.first('new_password') }}</span>
					</b-form-group>
          <b-form-group :label="$t('profile.settings.new_password_repeat')"
												class="font-weight-bold">
							<b-form-input name="repeat_password"
												type="password"
												v-model="settings.new_password_repeat"
												v-bind:placeholder="$t('profile.settings.new_password_repeat')"
												data-vv-as=" "
												v-validate="'required|confirmed:passwordRef'"
												:class="{'form-control': true, 'error': errors.has('repeat_password') }">
							</b-form-input>
							<span>{{ errors.first('repeat_password') }}</span>
					</b-form-group>
          <b-button type="submit" variant="success">{{$t('button.save')}}</b-button>
        </b-form>
        <hr>
        <h1 class="text-left">{{ $t('profile.settings.change_email') }}</h1>
        <hr>
        <h1 class="text-left">{{ $t('profile.settings.change_info') }}</h1>
        <hr>
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
        settings: {
          old_password: '',
          new_password: '',
          new_password_repeat: '',
          email: '',
          first_name: '',
          last_name: ''
        },
        showSuccessAlert: false,
        showErrorAlert: false
      }
    },
    mounted() {

      },
    methods: {
      logout() {
        localStorage.token = ''
        this.$router.push('/')
      },
      onSubmitPass(evt) {
          evt.preventDefault();
          this.$validator.validateAll()
          .then(result => {
            if(!result) {
              console.log('error')
              return false
            }
            // else {
              // HTTP
              //   .post('someurl', {
              //     'old_password': this.settings.old_password,
              //     'new_password': this.settings.new_password,
              //     'new_password_repeat': this.settings.new_password_repeat
              //   })
              //   .then (response => {
              //     if (response.data.success == true) {
              //       this.showSuccessAlert = true
              //        this.showErrorAlert = false
              //     } else {
              //       this.showErrorAlert = true
                        //this.showSuccessAlert = false
              //     }
              //   })
              //   .catch(() => {
              //     console.log(err.response.data.error.message)
              //     console.log("server error")
              //   })
            // }
          })
          // .catch(() => {
          //   console.log('error')
          // })
      },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 1.5rem;
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
