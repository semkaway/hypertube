<template>
  <v-layout row justify-center>
    <v-dialog v-model="showForm" persistent max-width="600px">
      <v-layout justify-end class="p-2">
        <v-icon x-large color="white" dark class="white--text" flat @click="$emit('toggleForm')" right>clear</v-icon>
       </v-layout>
    <v-card >
      <v-card-title>
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
        <v-card-text>
          <form>
              <v-text-field
              @keyup.native='validateInput'
              hint="Min 8 chars, one digit, one lower and upper case " 
              v-if='showRegisterForm == true' 
              :error-messages="arrayOfFirstNameErrors" 
              v-model="firstName" 
              :label="$t('registration.first_name')" 
              color="grey darken-1"
              name='firstName'
							v-validate="'required|alpha|min:3|max:15'"></v-text-field>

              <v-text-field
              @keyup.native='validateInput'
              v-if='showRegisterForm == true' 
              :error-messages="arrayOfLastNameErrors" 
              v-model="lastName" 
              :label="$t('registration.last_name')" 
              color="grey darken-1"
              name='lastName'
              v-validate="'required|alpha|min:3|max:15'"></v-text-field>

              <v-text-field 
              @keyup.native="checkIfEmailExists" 
              name="email" 
              v-validate="'required|email'" 
              v-model="email" 
              :error-messages="arrayOfEmailErrors" 
              label="Email" 
              color="grey darken-1"></v-text-field>

              <v-text-field v-if='!showForgotPassForm' :type="showPassword ? 'text' : 'password'" @keyup.native='validateInput' name="password" v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}" @click:append="showPassword = !showPassword"  :append-icon="showPassword ? 'visibility_off' : 'visibility'" v-model="password" :error-messages="arrayOfPasswordErrors" :label="$t('registration.password')" color="grey darken-1"></v-text-field>
              <v-text-field v-model="repeatPassword" :type="showPassword ? 'text' : 'password'" @keyup.native='validateInput' :error-messages="arrayOfRepeatPasswordErrors" name="repeatPassword" v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}" v-if='showRegisterForm == true'  :label="$t('registration.repeat_password')" color="grey darken-1"></v-text-field>
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
    </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { HTTP } from '../../http-common'

export default {
    name: 'LogInForm',
    props: ['showForm'],
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
        this.showRegisterForm = false
        this.showForgotPassForm = true

      },
      showRegister() {
        this.showRegisterForm = true
        this.showForgotPassForm = false
        this.checkIfEmailExists()
      },
      showLogin() {
        this.arrayOfEmailErrors = []
        this.showRegisterForm = false
        this.showForgotPassForm = false
      },

      sendEmail() {
        if (!this.emailErrors.length && this.email.length) {
          console.log('send email', this.email)
        }
      },
      loginViaIntra() {
         window.location.href = 'https://api.intra.42.fr/oauth/authorize?' +
          'client_id=5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7' +
          '&redirect_uri=http://localhost:8084/intra&' +
				  'response_type=code'
      },
      loginViaGit() {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=1dfde4107005f390f4ff'
      },
      logInUser() {
        console.log('login pass errors=>', this.arrayOfPasswordErrors)

        this.$validator.validateAll()
        if (!this.arrayOfPasswordErrors.length    && this.email.length && 
            !this.arrayOfPasswordErrors.length && this.password.length) {
          HTTP.post('user/login', {email: this.email, password: this.password})
          .then(response => {
            console.log('res', response)
            if (response.data.success) {
              console.log('success')
              // setAuthtoken
              // router push /
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
          })
          .catch(err => {
            this.arrayOfEmailErrors = [this.$t('registration.error_alert')]
            this.arrayOfPasswordErrors = [this.$t('registration.error_alert')]
          })

        }
      },
      registerUser() {
         if (
          !this.arrayOfFirstNameErrors.length        && this.email.length &&
          !this.arrayOfLastNameErrors.length         && this.lastName.length &&
          !this.arrayOfEmailErrors.length            && this.firstName.length &&
          !this.arrayOfPasswordErrors.length         && this.password.length &&
          !this.arrayOfRepeatPasswordErrors.length   && this.repeatPassword.length) {
            console.log('register user')
            console.log('email', this.email)
            console.log('first name', this.firstName)
            console.log('last name', this.lastName)
            console.log('pass', this.password)
            console.log(this.$i18n.locale)

              HTTP.post(`user/create`, {
                  "first": this.firstName,
                  "last": this.lastName,
                  "email": this.email,
                  "password": this.password,
                  "locale": localStorage.locale
                })
                .then(response => {
                  console.log(response)
                  if (response.data.success == true) {
                    this.showAlertDanger = false
                    this.showAlertSuccess = true
                  } else if (response.data.success == false) {
                    this.showAlertSuccess = false
                    this.showAlertDanger = true
                  } else {
                    this.showAlertSuccess = false
                    this.showAlertDanger = true
                  }
                })
                .catch(() => {
                    this.arrayOfEmailErrors = [this.$t('registration.error_alert')]
                    this.arrayOfPasswordErrors = [this.$t('registration.error_alert')]
                })
          }
      },

      checkIfEmailExists() {
        this.validateInput()
        if (this.showRegisterForm && !this.showForgotPassForm) {
          HTTP.get(`user/check-email/` + this.email)
          .then(response => { this.arrayOfEmailErrors = response.data.exist == true ? [this.$t('validation.serverError')] : [] })
          .catch((err) => { this.arrayOfEmailErrors = [this.$t('registration.error_alert')] })
        }
      },

validateInput() {
      // debugger
      console.log(this.errors.any())
      console.log('this.errors', this.errors)
      console.log("this.errors.has('firstName')", this.errors.has('firstName'))
      console.log("this.errors.first('firstName')", this.errors.first('firstName'))
      if (this.errors.any()) {
            this.arrayOfEmailErrors = this.errors.has('email') ? this.errors.first('email') : []
            this.arrayOfPasswordErrors = this.errors.has('password') ? this.errors.first('password') : []
            this.arrayOfFirstNameErrors = this.errors.has('firstName') ? this.errors.first('firstName') : []
            this.arrayOfLastNameErrors = this.errors.has('lastName') ? this.errors.first('lastName') : []
      } else {
          this.arrayOfEmailErrors = []
          this.arrayOfPasswordErrors = []
          this.arrayOfFirstNameErrors = []
          this.arrayOfLastNameErrors = []
          this.arrayOfRepeatPasswordErrors = []
      }
      console.log('arrays =>', this.arrayOfEmailErrors, this.arrayOfPasswordErrors, this.arrayOfFirstNameErrors)
    }

    },
}

</script>
