<template>
  <div>
    <b-row>
      <b-col></b-col>
      <b-col align-self="center">
        <h1>{{ $t("registration.title") }}</h1>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group v-bind:label="$t('registration.first_name')">
              <b-form-input name="first_name"
                        v-model="registrationForm.first_name"
                        v-bind:placeholder="$t('registration.first_name')"
                        data-vv-as=" "
                        v-validate.disable="'required|alpha|min:3|max:15'">
              </b-form-input>
              <b-row>
                  <span>{{ errors.first('first_name') }}</span>
              </b-row>
          </b-form-group>
          <b-form-group v-bind:label="$t('registration.last_name')">
              <b-form-input name="last_name"
                        v-model="registrationForm.last_name"
                        v-bind:placeholder="$t('registration.last_name')"
                        data-vv-as=" "
                        v-validate.disable="'required|alpha|min:3|max:15'">
              </b-form-input>
              <b-row>
                  <span>{{ errors.first('last_name') }}</span>
              </b-row>
          </b-form-group>
          <b-form-group v-bind:label="$t('registration.email')">
              <b-form-input name="email"
                        v-model="registrationForm.email"
                        v-bind:placeholder="$t('registration.email')"
                        data-vv-as=" "
                        v-validate.disable="'required|email'">
              </b-form-input>
              <b-row>
                  <span>{{ errors.first('email') }}</span>
              </b-row>
          </b-form-group>
          <b-form-group v-bind:label="$t('registration.password')"
                        :error="errors.first('password')"
                        :description="$t('registration.password_hint')">
            <b-form-input name="password"
                          ref="passwordRef"
                          type="password"
                          v-model="registrationForm.password"
                          v-bind:placeholder="$t('registration.password')"
                          data-vv-as=" "
                          v-validate.disable="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}">
            </b-form-input>
            <b-row>
                <span>{{ errors.first('password') }}</span>
            </b-row>
          </b-form-group>
          <b-form-group v-bind:label="$t('registration.repeat_password')">
              <b-form-input name="repeat_password"
                        type="password"
                        v-model="registrationForm.repeat_password"
                        v-bind:placeholder="$t('registration.repeat_password')"
                        data-vv-as=" "
                        v-validate="'required|confirmed:passwordRef'">
              </b-form-input>
              <b-row>
                  <span>{{ errors.first('repeat_password') }}</span>
              </b-row>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
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
          console.log('success. submit form.')
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reset-button {
  height: 40px;
  padding: 1rem;
  background-color: inherit;
  border: none;
  /* font-weight: bold; */
  font-size: 0.8rem;
}

.reset-button:hover {
  color: #606266;
}


.reset-button:focus{
  outline: 0;

}
</style>
