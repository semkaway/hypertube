<template>
	<div>
		<b-alert 	variant="success"
							:show="showAlert"
							class="mt-3">{{$t('forgot_password.success_alert')}}
		</b-alert>
		<b-alert 	variant="danger"
							:show="showNoEmailAlert"
							class="mt-3">{{$t('forgot_password.error_alert')}}
		</b-alert>
		<b-alert 	variant="danger"
							:show="showNoValidationAlert"
							class="mt-3">
							<b-row>
							<b-col sm="3" lg="4"></b-col>
							<b-col sm="5" lg="4">
								<h1>{{$t('login.no_validation_alert')}}</h1>
							<b-form class="mt-4">
								<b-form-group v-bind:label="$t('login.email')"
															class="font-weight-bold">
										<b-form-input name="sendEmail"
															v-model="loginForm.email"
															v-bind:placeholder="$t('login.email')"
															data-vv-as=" "
															v-validate="'required|email'"
															:class="{'form-control': true, 'error': errors.has('email') }">
										</b-form-input>
										<span class="error-message">{{ errors.first('email') }}</span>
								</b-form-group>
								<b-btn class="mt-3" variant="outline-secondary"  @click="sendActivationLink">{{ $t('button.send_activation_link')}}</b-btn>
							</b-form>
						</b-col>
						<b-col sm="3" lg="4"></b-col>
					</b-row>
		</b-alert>
		<b-alert 	variant="success"
							:show="showEmailSentSuccess"
							class="mt-3">{{$t('registration.success_alert')}}
		</b-alert>
		<b-alert 	variant="success"
							:show="showAlertSuccess"
							class="mt-3">{{$t('login.success_alert')}}
		</b-alert>
    <b-alert 	variant="danger"
							:show="showAlertDanger"
							class="mt-3">{{$t('login.error_alert')}}
		</b-alert>
		<b-alert 	variant="danger"
							:show="showWrongPassAlert"
							class="mt-3">{{$t('login.wrong_pass_alert')}}
		</b-alert>
		<b-row>
			<b-col sm="3" lg="4"></b-col>
			<b-col sm="5" lg="4" class="mt-4 mb-5" :class="{'hideForm': hideForm}">
				<h1>{{ $t("login.title") }}</h1>
					<b-form @submit="onSubmit" class="mt-4">
						<b-form-group v-bind:label="$t('login.email')"
													class="font-weight-bold">
								<b-form-input name="email"
													v-model="loginForm.email"
													v-bind:placeholder="$t('login.email')"
													data-vv-as=" "
													v-validate="'required|email'"
													:class="{'form-control': true, 'error': errors.has('email') }">
								</b-form-input>
								<span class="error-message">{{ errors.first('email') }}</span>
						</b-form-group>
						<b-form-group v-bind:label="$t('login.password')"
													:error="errors.first('password')"
													class="font-weight-bold">
							<b-form-input name="password"
														ref="passwordRef"
														type="password"
														v-model="loginForm.password"
														v-bind:placeholder="$t('login.password')"
														data-vv-as=" "
														v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
														:class="{'form-control': true, 'error': errors.has('password') }">
							</b-form-input>
							<span class="error-message">{{ errors.first('password') }}</span><br>
							<span class="font-weight-light text-muted forgot-password" v-b-modal.modal-center>{{ $t('forgot_password.message') }}</span>
							<b-modal  ref="myModal"
												id="modal-center"
												centered
												:title="$t('forgot_password.title')"
												hide-footer >
								<b-form class="mt-4">
									<b-form-group v-bind:label="$t('login.email')"
																class="font-weight-bold">
											<b-form-input name="sendEmail"
																v-model="loginForm.email"
																v-bind:placeholder="$t('login.email')"
																data-vv-as=" "
																v-validate="'required|email'"
																:class="{'form-control': true, 'error': errors.has('email') }">
											</b-form-input>
											<span class="error-message">{{ errors.first('email') }}</span>
									</b-form-group>
									<b-btn class="mt-3" variant="outline-secondary"  @click="resetPassword">{{ $t('button.send')}}</b-btn>
								</b-form>
							</b-modal>
						</b-form-group>
						<b-button type="submit" variant="warning" >{{$t('button.submit')}}</b-button>
						<p class="mt-4 text-left text-muted">{{$t('login.go_to_register')}}<router-link to="/register" class="register-link"> {{ $t('button.register') }}</router-link></p><br>
					</b-form>
					<hr>
					<p class="omniauth">{{ $t('login.omniauth_text')}}</p>
					<b-button href="https://api.intra.42.fr/oauth/authorize?client_id=5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7&redirect_uri=http%3A%2F%2Flocalhost%3A8084%2Fintra&response_type=code" variant="dark">42 Intra</b-button>
					<b-button variant="danger">Something else</b-button>
				</b-col>
				<b-col sm="3" lg="4"></b-col>
			</b-row>
	</div>
</template>

 <script>

	import {HTTP} from '../http-common';

	export default {
		name: 'Login',
		data() {
			return {
				loginForm: {
					first_name: '',
					last_name: '',
					email: '',
					password: '',
					password_repeat: ''
				},
				showAlert: false,
				showNoEmailAlert: false,
				showWrongPassAlert: false,
				showNoValidationAlert: false,
				showAlertDanger: false,
      	showAlertSuccess: false,
				showEmailSentSuccess: false,
				hideForm: false
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
					 HTTP
						.post(`user/login`, {
							"email": this.loginForm.email,
							"password": this.loginForm.password
						})
						.then(response => {
							console.log(response.data)
							if (response.data.success == true) {
								this.showAlertDanger = false
								this.showAlertSuccess = true
								this.showAlert = false
								this.showNoEmailAlert = false
								this.showWrongPassAlert = false
								this.showNoValidationAlert = false
								this.showEmailSentSuccess = false
								this.hideForm = true
								this.$i18n.locale = response.data.locale
								localStorage.locale = response.data.locale
								localStorage.token = response.data.token
								setTimeout(() => { this.$router.push('/') }, 2000)
							} else if (response.data.success == false) {
								if (response.data.message == "Invalid email") {
									this.showAlertSuccess = false
									this.showNoEmailAlert = true
									this.showAlert = false
									this.showWrongPassAlert = false
									this.showNoValidationAlert = false
									this.showAlertDanger = false
									this.showEmailSentSuccess = false
								} else if (response.data.message == "Invalid password") {
									this.showAlertSuccess = false
									this.showWrongPassAlert = true
									this.showAlert = false
									this.showNoEmailAlert = false
									this.showNoValidationAlert = false
									this.showAlertDanger = false
									this.showEmailSentSuccess = false
								} else if (response.data.message == "User not activated") {
									this.showAlertSuccess = false
									this.showNoValidationAlert = true
									this.showAlert = false
									this.showNoEmailAlert = false
									this.showWrongPassAlert = false
									this.showAlertDanger = false
									this.showEmailSentSuccess = false
								} else {
									this.showAlertSuccess = false
									this.showAlertDanger = true
									this.showAlert = false
									this.showNoEmailAlert = false
									this.showWrongPassAlert = false
									this.showNoValidationAlert = false
									this.showEmailSentSuccess = false
								}
							}
						})
						.catch(() => {
		          console.log("can't connect to server")
		        })
				})
				.catch(() => {
					console.log('error')
				})
			},
			resetPassword() {
				console.log("email: "+this.loginForm.email)
				this.$validator.validate('email', this.loginForm.email)
				.then(result => {
					if(!result) {
						console.log('error')
						return false
					}
				else {
					  HTTP
              .post('user/password/token-generate', {
                  email: this.loginForm.email
								})
              .then(response => {
                  if (response.data.success == true) {
                      this.showAlert = true
                      this.$refs.myModal.hide()
                  } else if (response.data.success == false && (response.data.message == "User with this email doesn't exist")){
										this.showNoEmailAlert = true
										this.$refs.myModal.hide()
                  }
              })
							.catch(() => {
			          console.log("can't connect to server")
			        })
						}
					})
				.catch(() => {
					console.log('error')
			})
		},
		sendActivationLink() {
			this.$validator.validate('email', this.loginForm.email)
			.then(result => {
				if(!result) {
					console.log('error')
					return false
				} else {
					HTTP
						.post('user/resend-activation', {
								email: this.loginForm.email
							})
						.then(response => {
								if (response.data.success == true) {
									this.showNoValidationAlert = false
									this.showEmailSentSuccess = true;
								} else if (response.data.success == false && (response.data.message == "User with this email doesn't exist")){
									this.showNoEmailAlert = true
									this.showAlertSuccess = false
									this.showAlertDanger = false
									this.showAlert = false
									this.showWrongPassAlert = false
									this.showNoValidationAlert = false
									this.showEmailSentSuccess = false
								}
								else {
									this.showNoEmailAlert = false
									this.showAlertSuccess = false
									this.showAlertDanger = true
									this.showAlert = false
									this.showWrongPassAlert = false
									this.showNoValidationAlert = false
									this.showEmailSentSuccess = false
								}
						})
						.catch(() => {
							console.log("can't connect to server")
						})
					}
				})
			},
}
}
</script>

		<!-- Add "scoped" attribute to limit CSS to this component only -->
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

	.error-message {
		color: red;
		font-size: 0.8rem;
		font-weight: normal;
	}

	.forgot-password:hover {
		cursor: pointer;
		color: #2c3e50 !important;
	}

	a {
		color: #ffc107;
		text-transform: capitalize;
	}

	a:hover {
		color: #e0a800;
		text-decoration: none;
	}

	.hideForm {
		display: none;
	}
		</style>
