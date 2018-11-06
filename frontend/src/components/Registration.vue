<template>
  <div>
    <h1>{{ $t("registration.title") }}</h1>
    <el-row :gutter="20">
        <el-col :span="12" :offset="5">
          <div class="grid-content">
            <el-form :model="registrationForm" ref="registrationForm" label-width="12vw" method='post'>
                <el-form-item v-bind:label="$t('registration.first_name')" :error="errors.first('first_name')">
                    <el-input name="first_name"
                              v-model="registrationForm.first_name"
                              v-bind:placeholder="$t('registration.first_name')"
                              data-vv-as=" "
                              v-validate.disable="'required|alpha|min:3|max:15'">
                    </el-input>
                </el-form-item>
                <el-form-item v-bind:label="$t('registration.last_name')" :error="errors.first('last_name')">
                    <el-input name="last_name"
                              v-model="registrationForm.last_name"
                              v-bind:placeholder="$t('registration.last_name')"
                              data-vv-as=" "
                              v-validate.disable="'required|alpha|min:3|max:15'">
                    </el-input>
                </el-form-item>
                <el-form-item v-bind:label="$t('registration.email')" :error="errors.first('email')">
                    <el-input name="email"
                              v-model="registrationForm.email"
                              v-bind:placeholder="$t('registration.email')"
                              data-vv-as=" "
                              v-validate.disable="'required|email'">
                    </el-input>
                </el-form-item>
                <el-form-item v-bind:label="$t('registration.password')" :error="errors.first('password')">
                  <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      :content="$t('registration.password_hint')">
                      <el-input slot="reference"
                                name="password"
                                ref="passwordRef"
                                type="password"
                                v-model="registrationForm.password"
                                v-bind:placeholder="$t('registration.password')"
                                data-vv-as=" "
                                v-validate.disable="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}">
                      </el-input>
                    </el-popover>
                </el-form-item>
                <el-form-item v-bind:label="$t('registration.repeat_password')" :error="errors.first('repeat_password')">
                    <el-input name="repeat_password"
                              type="password"
                              v-model="registrationForm.repeat_password"
                              v-bind:placeholder="$t('registration.repeat_password')"
                              data-vv-as=" "
                              v-validate="'required|confirmed:passwordRef'">
                    </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="validateForm">{{ $t("button.submit") }}</el-button>
                  <button type="reset" value="Reset">{{ $t("button.reset") }}</button>
                </el-form-item>
              </el-form>
              <hr>
              <p>{{ $t('registration.omniauth_text')}}</p>
              <el-button type="info">42 Intra</el-button>
              <el-button type="warning">Something else</el-button>
            </div>
          </el-col>
    </el-row>
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
    validateForm() {
        this.$validator.validateAll()
        .then(result => {
          if(!result) {
            console.log('error')
            return false
          }
            console.log('success. submit form')
        })
        .catch(() => {
          console.log('error')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
