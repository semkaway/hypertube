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
              <v-text-field v-if='showRegisterForm == true' :error-messages="firstNameErrors" @input="$v.firstName.$touch()"  v-model="firstName" :label="$t('registration.first_name')" color="grey darken-1"></v-text-field>
              <v-text-field v-if='showRegisterForm == true' :error-messages="lastNameErrors" @input="$v.lastName.$touch()"  v-model="lastName" :label="$t('registration.last_name')" color="grey darken-1"></v-text-field>
              <v-text-field @keyup.native="checkIfEmailExists" v-model="email" :error-messages="$t('validation.email')" label="Email" color="grey darken-1" @input="$v.email.$touch()"></v-text-field>
              <v-text-field v-if='!showForgotPassForm' v-model="password" :error-messages="passwordErrors" @input="$v.password.$touch()" :label="$t('registration.password')" color="grey darken-1"></v-text-field>
              <v-text-field v-model="repeatePassword" :error-messages="repeatePasswordErrors" @input="$v.repeatePassword.$touch()"  v-if='showRegisterForm == true'  :label="$t('registration.repeat_password')" color="grey darken-1"></v-text-field>
          </form>
           <v-layout justify-start>
            <v-flex>
              <v-btn  v-if='!showRegisterForm && !showForgotPassForm' color="grey" class="white--text" @click='logInUser'>{{ $t('button.login') }}</v-btn>
              <v-btn  v-if='showRegisterForm == true && !showForgotPassForm' color="grey" class="white--text"  @click='registerUser'>{{ $t('button.register') }}</v-btn>
              <v-btn  v-if='showForgotPassForm == true' color="grey" class="white--text" @click='sendEmail'>{{ $t('button.send') }}</v-btn>
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
  import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'LogInForm',
    props: ['showForm'],
    data: function () {
      return {
          showRegisterForm: false,
          showForgotPassForm: false,
          email: '',
          password: '',
          repeatePassword: '',
          firstName: '',
          lastName: '',
          hasError: false
      }
    },

    validations: {
      email: { required, email, serverFail: function() { return this.hasError } },
      firstName: { required, minLength: minLength(3) },
      lastName: { required, minLength: minLength(3) },
      password: { required, minLength: minLength(8)},
      repeatePassword: { sameAsPassword: sameAs('password') }
    },

    methods: {
      showForgotPass() {
        this.showRegisterForm = false
        this.showForgotPassForm = true

      },
      showRegister() {
        this.showRegisterForm = true
        this.showForgotPassForm = false
      },
      showLogin() {
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
        console.log('login')
        if (!this.emailErrors.length    && this.email.length && 
            !this.passwordErrors.length && this.password.length) {
          console.log('login user')
          console.log('email', this.email)
          console.log('pass', this.password)
          HTTP.post('user/login', {email: this.email, password: this.password})
          .then(response => {
            console.log('res', response)
            if (response.data.success) {
              console.log('success')
              // setAuthtoken
              // router push /
            } else {
              // show errors
              this.hasError = true
              console.log(this.$v.email)
              // this.$v.email.$errorMessage('hello wrld')
              if (response.data.message == "Invalid email") {
                  // this.emailErrors()
								} else if (response.data.message == "Invalid password") {

								} else if (response.data.message == "User not activated") {

                } else {

                }
            }
          })
          .catch(err => {
            console.log('error', err)
          })

        }
      },
      registerUser() {
         if (
          !this.firstNameErrors.length        && this.email.length &&
          !this.lastNameErrors.length         && this.lastName.length && 
          !this.emailErrors.length            && this.firstName.length &&
          !this.passwordErrors.length         && this.password.length &&
          !this.repeatePasswordErrors.length  && this.repeatePassword.length) {
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
                  this.showAlertSuccess = false
                  this.showAlertDanger = true
                })


          }
      },

      checkIfEmailExists() {
        HTTP.get(`user/check-email/`+this.email)
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
        .catch((err) => {
          console.log(err.response.data.error)
        })
        }
    },

    computed: {
      firstNameErrors() {
        const errors = []
        if (!this.$v.firstName.$dirty || !this.$v.firstName.$model.length) return errors
        !this.$v.firstName.required && errors.push('First name is required')
        !this.$v.firstName.minLength && errors.push('The first name must be at least 3 characters')
        return errors
      },
      lastNameErrors() {
        const errors = []
        if (!this.$v.lastName.$dirty || !this.$v.lastName.$model.length) return errors
        !this.$v.lastName.required && errors.push('Last name is required')
        !this.$v.lastName.minLength && errors.push('The last name must be at least 3 characters')
        return errors
      },
      emailErrors() {
        const errors = []
        if (!this.$v.email.$dirty || !this.$v.email.$model.length) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        !this.$v.email.serverFail && errors.push('Server fail')
        return errors
      },
      passwordErrors() {
        const errors = []
        if (!this.$v.password.$dirty || !this.$v.password.$model.length) return errors
        !this.$v.password.required && errors.push('Password is required')
        !this.$v.password.minLength && errors.push('The password must be at least 8 characters')
        return errors
      },
      repeatePasswordErrors() {
        const errors = []
        if (!this.$v.repeatePassword.$dirty || !this.$v.repeatePassword.$model.length) return errors
        !this.$v.repeatePassword.sameAsPassword && errors.push('Passwords should be identical')
        return errors
      }
    }
}

</script>