<template>
	<div>
		<b-alert variant="success" :show="showAlertSuccess" class="mt-3">{{$t('registration.success_alert')}}</b-alert>
		<b-alert variant="danger" :show="showAlertDanger" class="mt-3">{{$t('registration.error_alert')}}</b-alert>
		<b-row>
			<b-col sm="3" lg="4"></b-col>
			<b-col sm="5" lg="4" class="mt-4 mb-5">
				<h1>{{ $t("registration.title") }}</h1>
				<b-form @submit="onSubmit" @reset="onReset" class="mt-4">
					<b-form-group :label="$t('registration.first_name')"
												class="font-weight-bold">
							<b-form-input name="first_name"
												v-model="registrationForm.first_name"
												v-bind:placeholder="$t('registration.first_name')"
												data-vv-as=" "
												v-validate="'required|alpha|min:3|max:15'"
												:class="{'form-control': true, 'error': errors.has('first_name') }">
							</b-form-input>
							<span>{{ errors.first('first_name') }}</span>
					</b-form-group>
					<b-form-group :label="$t('registration.last_name')"
												class="font-weight-bold">
							<b-form-input name="last_name"
												v-model="registrationForm.last_name"
												v-bind:placeholder="$t('registration.last_name')"
												data-vv-as=" "
												v-validate="'required|alpha|min:3|max:15'"
												:class="{'form-control': true, 'error': errors.has('last_name') }">
							</b-form-input>
							<span>{{ errors.first('last_name') }}</span>
					</b-form-group>
					<b-form-group :label="$t('registration.email')"
												class="font-weight-bold">
							<b-form-input name="email"
												v-model="registrationForm.email"
												v-bind:placeholder="$t('registration.email')"
												data-vv-as=" "
												v-validate="'required|email'"
												:class="{'form-control': true, 'error': errors.has('email'), 'email-error': emailError }"
												@keyup.native="checkIfEmailExists">
							</b-form-input>
							<span>{{ errors.first('email') }}</span>
							<span :class="{ 'hideEmailExists': hideEmailExists }">{{$t('registration.emailExists')}}</span>
					</b-form-group>
					<b-form-group :label="$t('registration.password')"
												:error="errors.first('password')"
												:description="$t('registration.password_hint')"
												class="font-weight-bold">
						<b-form-input name="password"
													ref="passwordRef"
													type="password"
													v-model="registrationForm.password"
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
												v-model="registrationForm.repeat_password"
												v-bind:placeholder="$t('registration.repeat_password')"
												data-vv-as=" "
												v-validate="'required|confirmed:passwordRef'"
												:class="{'form-control': true, 'error': errors.has('repeat_password') }">
							</b-form-input>
							<span>{{ errors.first('repeat_password') }}</span>
					</b-form-group>
					<b-button type="submit" variant="warning">{{$t('button.submit')}}</b-button>
					<b-button type="reset" variant="outline-warning">{{$t('button.reset')}}</b-button>
				</b-form>
				<p class="mt-3 text-left">{{ $t('registration.account_exists') }} <router-link to="/login">{{$t('button.login')}}</router-link></p>
				<hr>
				<p class="omniauth">{{ $t('login.omniauth_text')}}</p>
				<b-button variant="dark">42 Intra</b-button>
				<b-button variant="danger">Something else</b-button>
			</b-col>
			<b-col sm="3" lg="4"></b-col>
		</b-row>
	</div>
</template>

<script>
import {HTTP} from '../http-common';

export default {
	name: 'Registration',
	data() {
		return {
			registrationForm: {
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				password_repeat: ''
			},
			hideEmailExists: true,
			showAlertDanger: false,
			showAlertSuccess: false,
      emailError: false
		};
	},
	methods: {
		onSubmit (evt) {
			evt.preventDefault();
			this.$validator.validateAll()
			.then(result => {
				if(!result) {
					console.log('error')
					return false
				}
				console.log(this.$i18n.locale)
				HTTP
					.post(`user/create`, {
						"first": this.registrationForm.first_name,
						"last": this.registrationForm.last_name,
						"email": this.registrationForm.email,
						"password": this.registrationForm.password,
						"locale": this.$i18n.locale
					})
					.then(response => {
						console.log(response)
            if (response.data.success == true) {
            	this.showAlertDanger = false
            	this.showAlertSuccess = true
            } else if (response.data.success == false) {
            	this.showAlertSuccess = false
            	this.showAlertDanger = true
            }
					})
			})
			.catch(() => {
				console.log('error')
			})
		},
		onReset (evt) {
			evt.preventDefault();
			/* Reset our form values */
			this.registrationForm.email = '';
			this.registrationForm.first_name = '';
			this.registrationForm.last_name = '';
			this.registrationForm.password = '';
			this.registrationForm.repeat_password = '';
			this.registrationForm.checked = [];
			/* Trick to reset/clear native browser form validation state */
			this.show = false;
			this.$nextTick(() => { this.show = true });
		},
		checkIfEmailExists() {
			HTTP
			.get(`user/check-email?email=`+this.registrationForm.email)
			.then(response => {
				if (response.data.exist == true) {
					this.hideEmailExists = false
                  this.emailError = true
				} else if (response.data.exist == false) {
                  this.hideEmailExists = true
                  this.emailError = false
                }
				console.log(response.data.exist)
			})
		}
	}
}
</script>

<style scoped>

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

.email-error {
    border-color: #E84444;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(232,68,68,.6);
}

.email-error:focus {
    border-color: #E84444;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(232,68,68,.6);
}

span {
	color: red;
	font-size: 0.8rem;
	font-weight: normal;
}

a {
	color: #ffc107;
	text-transform: capitalize;
}

a:hover {
	color: #e0a800;
	text-decoration: none;
}

.hideEmailExists {
	display: none;
}

</style>
