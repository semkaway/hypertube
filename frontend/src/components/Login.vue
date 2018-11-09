<template>
  <div>
    <h1>{{ $t("login.title") }}</h1>
    <b-row>
      <b-col></b-col>
      <b-col align-self="center">
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group v-bind:label="$t('login.email')">
                <b-form-input name="email"
                          v-model="loginForm.email"
                          v-bind:placeholder="$t('login.email')"
                          data-vv-as=" "
                          v-validate.disable="'required|email'">
                </b-form-input>
                <b-row>
                    <span>{{ errors.first('email') }}</span>
                </b-row>
            </b-form-group>
            <b-form-group v-bind:label="$t('login.password')"
                          :error="errors.first('password')"
                          :description="$t('registration.password_hint')">
              <b-form-input name="password"
                            ref="passwordRef"
                            type="password"
                            v-model="loginForm.password"
                            v-bind:placeholder="$t('login.password')"
                            data-vv-as=" "
                            v-validate.disable="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}">
              </b-form-input>
              <b-row>
                  <span>{{ errors.first('password') }}</span>
              </b-row>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
              <router-link to="/register" class="register-link">{{ $t('button.register') }}</router-link><br>
            </b-form>
          </b-col>
          <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>
          <p>{{ $t('forgot_password.message') }}</p>
          <b-button variant="primary">{{ $t("button.send") }}</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>
          <hr>
          <p class="omniauth">{{ $t('login.omniauth_text')}}</p>
          <b-button type="info">42 Intra</b-button>
          <b-button type="warning">Something else</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
      <!-- <el-row :gutter="20">
        <el-col :span="10" :offset="7">
          <el-collapse accordion>
            <el-row :gutter="20">
              <el-col :offset="1">
                <el-collapse-item :title="$t('button.forgot_password') " name="1">
                  <el-form ref="forgotPasswordForm" label-width="12vw" method='post'>
                    <el-form-item>
                      <p>{{ $t('forgot_password.message') }}</p>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="email"
                                name="forgot_password_email"
                                v-bind:placeholder="$t('login.email')"
                                data-vv-as=" ">
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="forgotPassword">{{ $t("button.send") }}</el-button>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-col>
            </el-row>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" :offset="7">
          <hr>
          <p class="omniauth">{{ $t('login.omniauth_text')}}</p>
          <el-button type="info">42 Intra</el-button>
          <el-button type="warning">Something else</el-button>
        </el-col>
    </el-row> -->
  </div>
</template>

    <script>
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
          email: ''
        };
      },
      methods: {
      //   validateForm() {
      //       this.$validator.validateAll()
      //       .then(result => {
      //         if(!result) {
      //           console.log('error')
      //           return false
      //         }
      //           console.log('success. submit form')
      //       })
      //       .catch(() => {
      //         console.log('error')
      //       })
      //   },
      //   forgotPassword() {
      //     console.log('sending message to ' + this.email)
      //   },
      // }
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
        this.loginForm.email = '';
        this.loginForm.first_name = '';
        this.loginForm.last_name = '';
        this.loginForm.password = '';
        this.loginForm.repeat_password = '';
        this.loginForm.checked = [];
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => { this.show = true });
      }
    }
  }
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    .register-link {
      color: #569aef;
      font-size: 1rem;
    }

    .register-link hover {
      color: #76b0f9;
    }
    </style>
