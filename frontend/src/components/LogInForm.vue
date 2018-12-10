<template>
  <v-layout row justify-center>
    <v-dialog v-model="showForm" persistent max-width="600px">
      <v-layout justify-end class="p-2">
        <v-icon x-large color="white" dark class="white--text" flat @click="$emit('toggleForm')" right>clear</v-icon>
       </v-layout>
    <v-card >
      <v-card-title v-if='showSuccess === false'>
        <v-toolbar class='hidden-sm-and-down'>
          <v-toolbar-items >
              <v-btn :color='!showRegisterForm && !showForgotPassForm ? "blue-grey darken-3" : "grey"' class="white--text" @click='showLogin' flat>{{ $t('button.login') }}</v-btn>
              <v-btn :color='showRegisterForm && !showForgotPassForm ? "blue-grey darken-3" : "grey"' class="white--text" @click='showRegister' flat>{{ $t('button.register') }} </v-btn>
              <v-btn :color='showForgotPassForm ? "blue-grey darken-3" : "grey"' class="white--text" @click='showForgotPass' flat>{{ $t('forgot_password.message') }}</v-btn>
        </v-toolbar-items>
        </v-toolbar>
         <v-layout class='hidden-md-and-up' align-center justify-start column fill-height>
              <v-btn :color='!showRegisterForm && !showForgotPassForm ? "blue-grey darken-3" : "grey"' class="white--text" @click='showLogin' flat>{{ $t('button.login') }}</v-btn>
              <v-btn :color='showRegisterForm && !showForgotPassForm ? "blue-grey darken-3" : "grey"' class="white--text" @click='showRegister' flat>{{ $t('button.register') }}</v-btn>
              <v-btn :color='showForgotPassForm ? "blue-grey darken-3" : "grey"' class="white--text" @click='showForgotPass' flat>{{ $t('forgot_password.message') }}</v-btn>
         </v-layout>
      </v-card-title>
        <v-card-text v-if='showSuccess === false'>
            <form>
                <v-text-field
					@keyup.native='validateFirstName'
					v-if='showRegisterForm == true' 
					:error-messages="arrayOfFirstNameErrors" 
					v-model="firstName"
					:label="$t('registration.first_name')" 
					color="grey darken-1"
					name='firstName'
					v-validate="'required|alpha|min:3|max:15'"
					:counter='15'
                ></v-text-field>
                <v-text-field
					@keyup.native='validateLastName'
					v-if='showRegisterForm == true' 
					:error-messages="arrayOfLastNameErrors" 
					v-model="lastName" 
					:label="$t('registration.last_name')" 
					color="grey darken-1"
					name='lastName'
					v-validate="'required|alpha|min:3|max:15'"
					:counter='15'
                ></v-text-field>
			</form>
          	<form>
				<v-text-field
					@keyup.native="checkIfEmailExists" 
					name="email" 
					v-validate="'required|email'" 
					v-model="email" 
					:error-messages="arrayOfEmailErrors" 
					label="Email" 
					color="grey darken-1"></v-text-field>
				<v-text-field 
					v-if='!showForgotPassForm'
					persistent-hint
					:hint="$t('validation.passwordHint')"
					ref="passwordRef"
					:type="showPassword ? 'text' : 'password'" 
					@keyup.native='validatePassword' 
					name="password" 
					v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}" 
					@click:append="showPassword = !showPassword"  
					:append-icon="showPassword ? 'visibility_off' : 'visibility'" 
					v-model="password" 
					:error-messages="arrayOfPasswordErrors" 
					:label="$t('registration.password')" 
					color="grey darken-1"></v-text-field>
				<v-text-field
					v-if='showRegisterForm == true' 
					v-model="repeatPassword" 
					:type="showPassword ? 'text' : 'password'" 
					@keyup.native='validateRepeatePassword' 
					:error-messages="arrayOfRepeatPasswordErrors" 
					name="repeatPassword" 
					v-validate="'required|confirmed:passwordRef'"
					:label="$t('registration.repeat_password')" 
					color="grey darken-1"></v-text-field>
          	</form>
           <v-layout justify-start>
            <v-flex>
              <v-btn v-if='!showRegisterForm && !showForgotPassForm' color="grey" class="white--text" @click='logInUser'>{{ $t('button.login') }}</v-btn>
              <v-btn v-if='showRegisterForm == true && !showForgotPassForm' color="grey" class="white--text"  @click='registerUser'>{{ $t('button.register') }}</v-btn>
              <v-btn v-if='showForgotPassForm == true' color="grey" class="white--text" @click='sendEmail'>{{ $t('button.send') }}</v-btn>
              <v-btn color="grey" class="white--text" @click='loginViaIntra'>42 Intra <v-icon right dark>school</v-icon></v-btn>
              <v-btn color="grey" class="white--text" @click='loginViaGit' >Github<v-icon right dark>public</v-icon></v-btn>
              </v-flex>
            </v-layout>
        </v-card-text>
		<v-card-text v-if='showSuccess === true'>
			<v-alert :value="showSuccess" color='grey' type="success" transition="scale-transition" >
      			{{ successMessage }}
    		</v-alert>
		</v-card-text>
    </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
	import axios from 'axios'
  	import { HTTP } from '../http-common'
  	import setAuthorizationToken from '../utils/setAuthToken'

export default {
    name: 'LogInForm',
    props: ['showForm', 'token', 'locale'],
    data: function () {
      return {
          showPassword: false,
          showRegisterForm: false,
          showForgotPassForm: false,
          email: '',
          password: '',
          repeatPassword: '',
          firstName: '',
          lastName: '',
		  showSuccess: false,
		  successMessage: '',
          arrayOfEmailErrors: [],
          arrayOfPasswordErrors: [],
          arrayOfFirstNameErrors: [],
          arrayOfLastNameErrors: [],
          arrayOfRepeatPasswordErrors: [],
      }
    },

    methods: {
      showForgotPass() {
        this.arrayOfEmailErrors = []
        this.arrayOfPasswordErrors = []
        this.arrayOfFirstNameErrors = []
        this.arrayOfLastNameErrors = []
        this.arrayOfRepeatPasswordErrors = []
        this.showRegisterForm = false
        this.showForgotPassForm = true
      },
      showRegister() {
		this.arrayOfEmailErrors = []
        this.arrayOfPasswordErrors = []
        this.arrayOfFirstNameErrors = []
        this.arrayOfLastNameErrors = []
        this.arrayOfRepeatPasswordErrors = []
        this.showRegisterForm = true
        this.showForgotPassForm = false
       
      },
      showLogin() {
        this.arrayOfEmailErrors = []
        this.arrayOfPasswordErrors = []
        this.arrayOfFirstNameErrors = []
        this.arrayOfLastNameErrors = []
        this.arrayOfRepeatPasswordErrors = []
        this.showRegisterForm = false
        this.showForgotPassForm = false
      },

    sendEmail() {
		if (!this.email.length) { this.arrayOfEmailErrors = [this.$t('validation.required')]}
        if (!this.arrayOfEmailErrors.length && this.email.length) {
			HTTP.get(`user/check-email/` + this.email).then(response => {
				if (response.data.exist == true) {
				HTTP.post('user/password/token-generate', { email: this.email }).then(response => {
            		if (response.data.success == true) {
						this.showSuccess = true
						this.successMessage = this.$t('forgot_password.success_alert')
						setTimeout(() => { this.$emit('toggleForm')}, 1800)
                	} else if (response.data.success == false && (response.data.message == "User with this email doesn't exist")){
						this.arrayOfEmailErrors = [this.$t('forgot_password.error_alert')]
                	}}).catch((err) => { 
						this.arrayOfEmailErrors = [this.$t('registration.error_alert')]
					})
			} else {
				this.arrayOfEmailErrors = [this.$t('forgot_password.error_alert')]
			}}).catch((err) => {
				this.arrayOfEmailErrors = [this.$t('registration.error_alert')] 
			})
		}
    },

    loginViaIntra() {
		this.$emit('runLoader')
    	window.location.href = 'https://api.intra.42.fr/oauth/authorize?' +
      	'client_id=5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7' +
      	'&redirect_uri=http://localhost:8084/intra&' +
		'response_type=code'
		this.$emit('toggleForm')
    },

    loginViaGit() {
		this.$emit('runLoader')
    	window.location.href = 'https://github.com/login/oauth/authorize?client_id=1dfde4107005f390f4ff'
		this.$emit('toggleForm')
    },

    logInUser() {
    	this.$validator.validateAll().then((valid) => {
			if (!valid) {
				this.validateEmail()
				this.validateFirstName()
				this.validateLastName()
				this.validatePassword()
				this.validateRepeatePassword()
			} else if (!this.arrayOfEmailErrors.length && !this.arrayOfPasswordErrors.length) {
				HTTP.post('user/login', {email: this.email, password: this.password}).then(response => {
				if (response.data.success) {
					this.$emit('toggleForm')
					this.$i18n.locale = response.data.locale
					localStorage.locale = response.data.locale
					localStorage.token = response.data.token
					setAuthorizationToken(response.data.token)
					this.$emit('setUser', {token: response.data.token, locale: response.data.locale})
				} else {
					if (response.data.message == "Invalid email") {
						this.arrayOfEmailErrors = [this.$t('validation.invalidEmail')]
					} else if (response.data.message == "Invalid password") {
						this.arrayOfPasswordErrors = [this.$t('validation.invalidPassword')]
						} else if (response.data.message == "User not activated") {
						this.arrayOfEmailErrors = [this.$t('validation.notActivated')]
						this.arrayOfPasswordErrors = [this.$t('validation.notActivated')]
					} else {
						this.arrayOfEmailErrors = [this.$t('registration.error_alert')]
						this.arrayOfPasswordErrors = [this.$t('registration.error_alert')]
					}
				}
				}).catch(err => {
					this.arrayOfEmailErrors = [this.$t('registration.error_alert')]
					this.arrayOfPasswordErrors = [this.$t('registration.error_alert')]
				})
			}
		})
    },

    registerUser() {
		this.$validator.validateAll().then((valid) => {
			if (!valid) {
				this.validateEmail()
				this.validateFirstName()
				this.validateLastName()
				this.validatePassword()
				this.validateRepeatePassword()
			} else if (!this.arrayOfEmailErrors.length) {
			HTTP.post(`user/create`, {
				"first": this.firstName,
				"last": this.lastName,
				"email": this.email,
				"password": this.password,
				"locale": this.locale })
			.then(response => {
				console.log(response)
					if (response.data.success == true) {
						this.showSuccess = true
						this.successMessage = this.$t('registration.success_alert')
						setTimeout(() => { this.$emit('toggleForm')}, 2100)
					} else {
						this.arrayOfEmailErrors = [this.$t('validation.serverError')]
					}}).catch(() => {
						this.arrayOfEmailErrors = [this.$t('registration.error_alert')]
						this.arrayOfPasswordErrors = [this.$t('registration.error_alert')]
					})
			} else {
				this.arrayOfEmailErrors = [this.$t('validation.serverError')]
			}
  	})
	},

		checkIfEmailExists() {
			this.validateEmail()
			if (!this.arrayOfEmailErrors.length && this.showRegisterForm && !this.showForgotPassForm && this.email.length) {
			HTTP.get(`user/check-email/` + this.email)
				.then(response => { this.arrayOfEmailErrors = response.data.exist == true ? [this.$t('validation.serverError')] : this.arrayOfEmailErrors })
				.catch((err) => { this.arrayOfEmailErrors = [this.$t('registration.error_alert')] })
			}
		},

		validateEmail() {
			if (this.errors.has('email')) {
				this.arrayOfEmailErrors = this.email.length ? [this.$t('validation.email')] : [this.$t('validation.required')]
			} else {
				this.arrayOfEmailErrors = []
			}
		},

		validateFirstName() {
			if (this.errors.has('firstName')) {
				if (this.firstName.length > 15) {
					this.arrayOfFirstNameErrors = [this.$t('validation.firstNameLong')]
				} else if (!this.firstName.length){
					this.arrayOfFirstNameErrors = [this.$t('validation.required')]
				} else	if (this.firstName.length < 3){
					this.arrayOfFirstNameErrors = [this.$t('validation.firstNameShort')]
				} else {
					this.arrayOfFirstNameErrors =  [this.$t('validation.firstNameFormat')]
				}
			} else {
				this.arrayOfFirstNameErrors = []
			}
		},

		validateLastName() {
			if (this.errors.has('lastName')) {
				if (this.lastName.length > 15) {
					this.arrayOfLastNameErrors = [this.$t('validation.firstNameLong')]
				} else if (!this.lastName.length){
					this.arrayOfLastNameErrors = [this.$t('validation.required')]
				} else	if (this.lastName.length < 3){
					this.arrayOfLastNameErrors = [this.$t('validation.firstNameShort')]
				} else {
					this.arrayOfLastNameErrors =  [this.$t('validation.firstNameFormat')]
				}
			} else {
				this.arrayOfLastNameErrors = []
			}
		},

		validatePassword() {
			if (this.errors.has('password')) {
				this.arrayOfPasswordErrors = this.password.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')]
			} else {
				this.arrayOfPasswordErrors = []
			}
		},

		validateRepeatePassword() {
			if (this.errors.has('repeatPassword')) {
				this.arrayOfRepeatPasswordErrors = this.repeatPassword.length ? [this.$t('validation.repeatPassword')] : [this.$t('validation.required')]
			} else {
				this.arrayOfRepeatPasswordErrors = []
			}
		}
    },
}

</script>
