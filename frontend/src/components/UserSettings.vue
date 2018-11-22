<template>
  <div>
    <b-row>
			<b-col sm="3" lg="4"></b-col>
			<b-col sm="5" lg="4">
				<b-alert 	variant="success"
									dismissible
									:show="showSuccessAlert"
                  @dismissed="showSuccessAlert=false"
									class="mt-3">{{$t('profile.success_alert')}}
				</b-alert>
				<b-alert 	variant="danger"
									dismissible
									:show="showErrorAlert"
                  @dismissed="showErrorAlert=false"
									class="mt-3">{{$t('login.error_alert')}}
				</b-alert>
			</b-col>
			<b-col sm="3" lg="4"></b-col>
		</b-row>
    <b-row >
      <b-col sm="3" lg="3" >
        <div class="text-left mt-5 ml-5 d-none d-lg-block" id="scrollspy">
          <h3 href="#">{{ $t('profile.settings_title') }}</h3>
          <b-list-group>
            <b-list-group-item class="hover-items" :class="{'normalHide': normalHide}"><a href="#password">{{ $t('profile.settings.change_password') }}</a></b-list-group-item>
            <b-list-group-item class="hover-items" :class="{'normalHide': normalHide}"><a href="#email">{{ $t('profile.settings.change_email') }}</a></b-list-group-item>
            <b-list-group-item class="hover-items" :class="{'omniauthHide': omniauthHide}"><a href="#email-and-pass">{{ $t('profile.settings.create_email_and_pass') }}</a></b-list-group-item>
            <b-list-group-item class="hover-items"><a href="#personal">{{ $t('profile.settings.change_info') }}</a></b-list-group-item>
            <b-list-group-item class="hover-items"><a href="#picture">{{ $t('profile.settings.change_picture') }}</a></b-list-group-item>
            <b-list-group-item class="hover-items"><a href="#social-media">{{ $t('profile.settings.add_media') }}</a></b-list-group-item>
            <b-list-group-item class="hover-items"><a href="#delete-account">{{ $t('profile.settings.delete_account_title') }}</a></b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col sm="5" lg="5" class="mt-4 mb-4" >
        <div :class="{'normalHide': normalHide}">
          <b-form @submit="onSubmitPass" class="mt-4 p-3" id="password">
            <h1 class="text-left mb-3">{{ $t('profile.settings.change_password') }}</h1>
            <b-form-group :label="$t('profile.settings.old_password')"
  												:error="errors.first('password')"
  												class="font-weight-bold">
  						<b-form-input name="old_password"
  													type="password"
  													v-model="settings.old_password"
  													v-bind:placeholder="$t('profile.settings.old_password')"
  													data-vv-as=" "
  													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
  													:class="{'form-control': true, 'error': errors.has('old_password') }">
  						</b-form-input>
              <span>{{ errors.first('old_password') }}</span>
            </b-form-group>
  					<b-form-group :label="$t('profile.settings.new_password')"
  												:error="errors.first('password')"
  												:description="$t('registration.password_hint')"
  												class="font-weight-bold">
  						<b-form-input name="new_password"
  													ref="passwordRef"
  													type="password"
  													v-model="settings.new_password"
  													v-bind:placeholder="$t('profile.settings.new_password')"
  													data-vv-as=" "
  													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
  													:class="{'form-control': true, 'error': errors.has('new_password') }">
  						</b-form-input>
  						<span>{{ errors.first('new_password') }}</span>
  					</b-form-group>
            <b-form-group :label="$t('profile.settings.new_password_repeat')"
  												class="font-weight-bold">
  							<b-form-input name="new_password_repeat"
  												type="password"
  												v-model="settings.new_password_repeat"
  												v-bind:placeholder="$t('profile.settings.new_password_repeat')"
  												data-vv-as=" "
  												v-validate="'required|confirmed:passwordRef'"
  												:class="{'form-control': true, 'error': errors.has('repeat_password') }">
  							</b-form-input>
  							<span>{{ errors.first('repeat_password') }}</span>
  					</b-form-group>
            <b-button type="submit" variant="outline-success" class="mt-2 t">{{$t('button.save')}}</b-button>
          </b-form>
          <hr>
          <b-form @submit="onSubmitEmail" class="mt-4 p-3" id="email">
            <h1 class="text-left mb-3">{{ $t('profile.settings.change_email') }}</h1>
            <b-form-group :label="$t('registration.email')"
  												class="font-weight-bold">
  							<b-form-input name="email"
  												v-model="settings.email"
  												v-bind:placeholder="$t('registration.email')"
  												data-vv-as=" "
  												v-validate="'required|email'"
  												:class="{'form-control': true, 'error': errors.has('email'), 'email-error': emailError }"
  												@keyup.native="checkIfEmailExists(settings.email)">
  							</b-form-input>
  							<span>{{ errors.first('email') }}</span>
  							<span :class="{ 'hideEmailExists': hideEmailExists }">{{$t('registration.emailExists')}}</span>
              </b-form-group>
              <b-button type="submit" variant="outline-success" class="mt-2">{{$t('button.save')}}</b-button>
          </b-form>
        </div>
        <div style="border: solid red 0.5px;" :class="{'omniauthHide': omniauthHide}">
          <b-form @submit="onSubmitEmailandPass" class="mt-4 p-3" id="email-and-pass">
            <h1 class="text-left mb-3">{{ $t('profile.settings.create_email_and_pass') }}</h1>
            <b-form-group :label="$t('registration.email')"
  												class="font-weight-bold">
  							<b-form-input name="create_email"
  												v-model="create.email"
  												v-bind:placeholder="$t('registration.email')"
  												data-vv-as=" "
  												v-validate="'required|email'"
  												:class="{'form-control': true, 'error': errors.has('email'), 'email-error': emailError }"
  												@keyup.native="checkIfEmailExists(create.email)">
  							</b-form-input>
  							<span>{{ errors.first('create_email') }}</span>
  							<span :class="{ 'hideEmailExists': hideEmailExists }">{{$t('registration.emailExists')}}</span>
              </b-form-group>
              <b-form-group :label="$t('registration.password')"
    												:error="errors.first('create_password')"
    												:description="$t('registration.password_hint')"
    												class="font-weight-bold">
    						<b-form-input name="create_password"
    													ref="password_create"
    													type="password"
    													v-model="create.password"
    													v-bind:placeholder="$t('registration.password')"
    													data-vv-as=" "
    													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
    													:class="{'form-control': true, 'error': errors.has('new_password') }">
    						</b-form-input>
    						<span>{{ errors.first('create_password') }}</span>
    					</b-form-group>
              <b-form-group :label="$t('registration.repeat_password')"
    												class="font-weight-bold">
    							<b-form-input name="create_password_repeat"
    												type="password"
    												v-model="create.password_repeat"
    												v-bind:placeholder="$t('registration.repeat_password')"
    												data-vv-as=" "
    												v-validate="'required|confirmed:password_create'"
    												:class="{'form-control': true, 'error': errors.has('repeat_password') }">
    							</b-form-input>
    							<span>{{ errors.first('create_password_repeat') }}</span>
    					</b-form-group>
              <b-button type="submit" variant="outline-success" class="mt-2">{{$t('button.save')}}</b-button>
          </b-form>
        </div>
        <hr>
        <b-form @submit="onSubmitPersonal" class="mt-4 p-3" id="personal">
          <h1 class="text-left mb-3">{{ $t('profile.settings.change_info') }}</h1>
          <b-form-group :label="$t('registration.first_name')"
												class="font-weight-bold">
							<b-form-input name="first_name"
												v-model="settings.first_name"
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
												v-model="settings.last_name"
												v-bind:placeholder="$t('registration.last_name')"
												data-vv-as=" "
												v-validate="'required|alpha|min:3|max:15'"
												:class="{'form-control': true, 'error': errors.has('last_name') }">
							</b-form-input>
							<span>{{ errors.first('last_name') }}</span>
					</b-form-group>
          <b-button type="submit" variant="outline-success" class="mt-2">{{$t('button.save')}}</b-button>
        </b-form>
        <hr>
        <div id="picture" class="mt-4 p-3">
          <h1 class="text-left mb-3">{{ $t('profile.settings.change_picture') }}</h1>
          <input type=file @change="onFileSelected">
          </canvas>
          <b-button variant="info" @click="Upload">Upload</b-button>
        </div>
        <hr>
        <div id="social-media" class="mt-4 p-3">
          <h1 class="text-left mb-3">{{ $t('profile.settings.add_media') }}</h1>
          <b-btn class="mt-3" variant="dark" @click="deleteAccount">42 Intra</b-btn>
          <b-btn class="mt-3" variant="dark" @click="hideModal">Github</b-btn>
        </div>
        <hr>
        <div class="mt-4 p-3" id="delete-account">
          <h1 class="text-left mb-3">{{ $t('profile.settings.delete_account_title') }}</h1>
          <b-button variant="danger" size="lg" @click="showModal" class="mt-2">{{$t('button.delete')}}</b-button>
          <b-modal  ref="deleteAccount"
                    centered
                    hide-footer
                    :title="$t('profile.settings.delete_account_title')"
                    :header-bg-variant="headerBgVariant"
                    :header-text-variant="headerTextVariant">
            <p class="my-4">{{ $t('profile.settings.delete_account_text') }}</p>
            <b-btn class="mt-3" variant="outline-danger" @click="deleteAccount">{{$t('button.delete')}}</b-btn>
            <b-btn class="mt-3" variant="outline-secondary" @click="hideModal">{{$t('button.cancel')}}</b-btn>
          </b-modal>
        </div>
      </b-col>

      <b-col sm="3" lg="4"></b-col>
    </b-row>
  </div>
</template>

<script>

import {HTTP} from '../http-common';
// import saveAs from 'file-saver';

export default {
  name: 'UserPage',
  data () {
    return {
        settings: {
          old_password: '',
          new_password: '',
          new_password_repeat: '',
          email: '',
          first_name: '',
          last_name: ''
        },
        create: {
          password: '',
          password_repeat: '',
          email: ''
        },
        showSuccessAlert: false,
        showErrorAlert: false,
        hideEmailExists: true,
        emailError: false,
        omniauthHide: true,
        normalHide: false,
        headerBgVariant: 'danger',
        headerTextVariant: 'light',
        imageSelected: null,
        maxSize: 1024
      }
    },
    mounted() {

      },
    methods: {
      logout() {
        localStorage.token = ''
        this.$router.push('/')
      },
      onSubmitPass(evt) {
          evt.preventDefault();
          this.$validator.validate('old_password', this.settings.old_password)
          this.$validator.validate('new_password', this.settings.new_password)
          this.$validator.validate('new_password_repeat', this.settings.new_password_repeat)

          .then(result => {
            if(!result) {
              console.log('error')
              return false
            }
            else {
              // HTTP
              //   .post('someurl', {
              //     'old_password': this.settings.old_password,
              //     'new_password': this.settings.new_password,
              //     'new_password_repeat': this.settings.new_password_repeat
              //   })
              //   .then (response => {
              //     if (response.data.success == true) {
                    this.showSuccessAlert = true
                     this.showErrorAlert = false
              //     } else {
              //       this.showErrorAlert = true
                        //this.showSuccessAlert = false
              //     }
              //   })
              //   .catch((err) => {
              //     console.log(err.response.data.error.message)
              //     console.log("server error")
              //   })
            }
          })
          // .catch(() => {
          //   console.log('error')
          // })
      },
      checkIfEmailExists(email) {
  			HTTP
  			.get(`user/check-email/`+email)
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
  				console.log("server error")
  			})
  		},
      onSubmitEmail(evt) {
        evt.preventDefault();
        this.$validator.validate('email', this.settings.email)
        .then(result => {
          if(!result) {
            console.log('error')
            return false
          }
          else {
            // HTTP
            //   .post('someurl', {
            //     'email': this.settings.email
            //   })
            //   .then (response => {
            //     if (response.data.success == true) {
                  // this.showSuccessAlert = true
                  //  this.showErrorAlert = false
            //     } else {
                  // this.showErrorAlert = true
                  //     this.showSuccessAlert = false
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err.response.data.error.message)
            //     console.log("server error")
            //   })
          }
        })
        // .catch(() => {
        //   console.log('error')
        // })
      },
      onSubmitEmailandPass(evt) {
        evt.preventDefault();
        this.$validator.validate('create_email', this.create.email)
        this.$validator.validate('create_password', this.create.password)
        this.$validator.validate('create_password_repeat', this.create.password_repeat)
        .then(result => {
          if(!result) {
            console.log('error')
            return false
          }
          else {
            // HTTP
            //   .post('someurl', {
            //     'email': this.settings.email
            //   })
            //   .then (response => {
            //     if (response.data.success == true) {
                  this.showSuccessAlert = true
                   this.showErrorAlert = false
            //     } else {
                  // this.showErrorAlert = true
                  //     this.showSuccessAlert = false
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err.response.data.error.message)
            //     console.log("server error")
            //   })
          }
        })
        // .catch(() => {
        //   console.log('error')
        // })
      },
      onSubmitPersonal(evt) {
        evt.preventDefault();
        this.$validator.validate('first_name', this.settings.first_name)
        this.$validator.validate('last_name', this.settings.last_name)
        .then(result => {
          if(!result) {
            console.log('error')
            return false
          }
          else {
            // HTTP
            //   .post('someurl', {
            //     'email': this.settings.email
            //   })
            //   .then (response => {
            //     if (response.data.success == true) {
                  this.showSuccessAlert = true
                   this.showErrorAlert = false
            //     } else {
                  // this.showErrorAlert = true
                  //     this.showSuccessAlert = false
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err.response.data.error.message)
            //     console.log("server error")
            //   })
          }
        })
        // .catch(() => {
        //   console.log('error')
        // })
      },
      showModal () {
        this.$refs.deleteAccount.show()
      },
      hideModal () {
        this.$refs.deleteAccount.hide()
      },
      deleteAccount() {
        console.log('account deleted')
        // HTTP
        //   .post('someurl', {
        //     'token': localStorage.token
        //   })
        //   .then (response => {
        //     if (response.data.success == true) {
              // localStorage.token = ''
              // window.location.href = '/'
        //     } else {
              // this.showErrorAlert = true
              //     this.showSuccessAlert = false
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err.response.data.error.message)
        //     console.log("server error")
        //   })
        this.hideModal()
      },
      Upload() {
        // FileSaver.saveAs("https://images.pexels.com/photos/1249214/pexels-photo-1249214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "hypertube/frontend/vuetestimg.jpg");
        // var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
        // // draw to canvas...
        // canvas.toBlob(function(blob) {
        //     saveAs(blob, "vuetestimg.png");
        //     console.log(blob)
        // });
        const fd = new FormData()
        fd.append('userimg', this.imageSelected, this.imageSelected.name)
        console.log(fd['userimg'])
        console.log('img uploaded')
      },
      onFileSelected(image){
        console.log('something happened')
        const { maxSize } = this
        const fileUploaded = image.target.files[0]

        if(fileUploaded.name.length > 0) {
          console.log('enter here')
          let size = fileUploaded.size / maxSize / maxSize
          if (!fileUploaded.type.match('image.*')) {
            // check whether the upload is an image
            console.log('lol, not an image')
          } else if (size>1) {
            // check whether the size is greater than the size limit
            console.log('your file is too big')
          } else {
          this.imageSelected = image.target.files[0]
        }
      }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 1.5rem;
}

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

.hideEmailExists, .omniauthHide, .normalHide {
	display: none;
}

#scrollspy {
  position: fixed;
}

a {
  color: #606266;
  text-decoration: none;
}

a:hover {
  color: black;
}

.hover-items:hover {
  background-color: #dff7cf;
}

</style>
