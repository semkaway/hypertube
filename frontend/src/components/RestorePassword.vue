<template>
  <div>
    <h1>{{ $t('forgot_password.title')}}</h1>
    <el-row :gutter="20">
        <el-col :span="12" :offset="5">
          <div class="grid-content">
            <el-form label-width="12vw" method='post'>
              <el-form-item ref="restorePassForm" v-bind:label="$t('registration.password')" :error="errors.first('password')">
                <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    :content="$t('registration.password_hint')">
                    <el-input slot="reference"
                              name="password"
                              ref="passwordRef"
                              type="password"
                              v-model="restorePassForm.password"
                              v-bind:placeholder="$t('registration.password')"
                              data-vv-as=" "
                              v-validate.disable="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}">
                    </el-input>
                  </el-popover>
              </el-form-item>
              <el-form-item v-bind:label="$t('registration.repeat_password')" :error="errors.first('repeat_password')">
                  <el-input name="repeat_password"
                            type="password"
                            v-model="restorePassForm.repeat_password"
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
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'RestorePassword',
  data () {
    return {
      restorePassForm: {
        password: '',
        repeat_password: ''
      }
    }
  },
  methods: {
    validateForm() {
        this.$validator.validateAll()
        .then(result => {
          if(!result) {
            console.log('error')
            return false
          }
            console.log('success. submit form. password: ' + this.restorePassForm.password)
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
