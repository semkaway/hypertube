<template>
  <v-container v-if="setPassword" grid-list-md class="mt-5">
    <v-layout row wrap>
      <v-flex lg4></v-flex>
      <v-flex lg4>
        <form class="mt-5">
          <v-text-field
            class='ml-3'
            :hint="$t('validation.passwordHint')"
            :label="$t('profile.settings.new_password')"
            @keyup.native='validatePassword'
            :error-messages="arrayOfNewPasswordErrors"
            v-model="newPassword"
            ref="newPasswordRef"
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            color="blue-grey darken-1"
            name='newPassword'
            v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}">
          </v-text-field>
          <v-text-field
            class='ml-3'
            :label="$t('profile.settings.new_password_repeat')"
            @keyup.native='validatePassword'
            :error-messages="arrayOfRepeatPasswordErrors"
            v-model="repeatNewPassword"
            :type="showPassword ? 'text' : 'password'"
            color="blue-grey darken-1"
            name='repeatNewPassword'
            v-validate="'required|confirmed:newPasswordRef'">
          </v-text-field>
        </form>
        <v-btn style="outline: none;" @click='changePassword' color="blue-grey lighten-1" dark>{{ $t('button.save') }}</v-btn>
      </v-flex>
      <v-flex lg4></v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import {HTTP} from '../http-common';

export default {
  name: 'ResetPassword',
  data() {
    return {
      setPassword: false,
      showPassword: false,
      newPassword: '',
      repeatNewPassword: '',
      arrayOfNewPasswordErrors: [],
      arrayOfRepeatPasswordErrors: []
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const myToken = urlParams.get('token');

    HTTP.get(`user/password/token-check/${myToken}`)
      .then(response => {
        // console.log(response)
        if (response.data.success == true) {
          this.setPassword = true
        } else if (response.data.success == false && (response.data.message != "Invalid token")) {
          this.$router.push('/')
          this.$emit('userActivate', 'activation.error_alert')
        } else {
          this.$router.push('/')
          this.$emit('userActivate', 'activation.invalid_alert')
        }
      })
      .catch((err) => {
        console.log(err)
        this.$router.push('/')
        this.$emit('userActivate', 'activation.error_alert')
      })
    },
    methods: {
      validatePassword(e) {
  			const fieldName = e.target.attributes.name.nodeValue
  			if (fieldName === 'newPassword') {
  				this.arrayOfNewPasswordErrors = this.errors.has('newPassword') ? this.newPassword.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')] : []
  			} else if (fieldName === 'repeatNewPassword') {
  				this.arrayOfRepeatPasswordErrors = this.errors.has('repeatNewPassword') ? this.repeatNewPassword.length ? [this.$t('validation.repeatPassword')] : [this.$t('validation.required')] : []
  			}
  		},
      changePassword() {
        const urlParams = new URLSearchParams(window.location.search);
        const myToken = urlParams.get('token');
  			if (!this.arrayOfNewPasswordErrors.length && !this.arrayOfRepeatPasswordErrors.length && this.newPassword) {
          HTTP.post('user/password/change', {
            'password': this.newPassword,
            'token': myToken
          })
          .then(response => {
            if (response.data.success) {
              this.$router.push('/')
              this.$emit('userActivate', 'forgot_password.restore_pass_success_title')
            } else {
              this.arrayOfNewPasswordErrors = [this.$t('registration.error_alert')]
            }
          })
          .catch((err) => {
            console.log(err)
            this.$router.push('/')
            this.$emit('userActivate', 'activation.error_alert')
          })
  			} else {
          this.arrayOfNewPasswordErrors = [this.$t('registration.error_alert')]
        }
  		}
    }
  }
</script>
