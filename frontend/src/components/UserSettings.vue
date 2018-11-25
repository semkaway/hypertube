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
        <b-alert 	variant="success"
									dismissible
									:show="showSuccessPassAlert"
                  @dismissed="showSuccessPassAlert=false"
									class="mt-3">{{$t('forgot_password.restore_pass_success_title')}} {{$t('forgot_password.restore_pass_success_alert')}}
				</b-alert>
				<b-alert 	variant="danger"
									dismissible
									:show="showErrorPassAlert"
                  @dismissed="showErrorPassAlert=false"
									class="mt-3">{{$t('profile.error_pass_alert')}}
				</b-alert>
        <b-alert 	variant="danger"
									dismissible
									:show="showErrorAlert"
                  @dismissed="showErrorAlert=false"
									class="mt-3">{{$t('login.error_alert')}}
				</b-alert>
        <b-alert 	variant="success"
									dismissible
									:show="showEmailSentSuccess"
									@dismissed="showEmailSentSuccess=false"
									class="mt-3">{{$t('registration.success_alert')}}
				</b-alert>
			</b-col>
			<b-col sm="3" lg="4"></b-col>
		</b-row>
    <b-row >
      <b-col sm="3" lg="3" >
        <div class="text-left mt-5 ml-5 d-none d-lg-block" id="scrollspy">
          <h3 href="#">{{ $t('profile.settings_title') }}</h3>
          <b-list-group>
            <b-list-group-item class="hover-items" href="#password" :class="{'normalHide': normalHide}">{{ $t('profile.settings.change_password') }}</b-list-group-item>
            <b-list-group-item class="hover-items" href="#email" :class="{'normalHide': !createEmailHide}">{{ $t('profile.settings.change_email') }}</b-list-group-item>
            <b-list-group-item class="hover-items" href="#create-email" :class="{'omniauthHide': createEmailHide}">{{ $t('profile.settings.create_email') }}</b-list-group-item>
            <b-list-group-item class="hover-items" href="#create-pass" :class="{'omniauthHide': passwordHide}">{{ $t('profile.settings.create_pass') }}</b-list-group-item>
            <b-list-group-item class="hover-items" href="#personal">{{ $t('profile.settings.change_info') }}</b-list-group-item>
            <b-list-group-item class="hover-items" href="#picture">{{ $t('profile.settings.change_picture') }}</b-list-group-item>
            <b-list-group-item class="hover-items" href="#social-media" :class="{'socialHide': socialHide}">{{ $t('profile.settings.add_media') }}</b-list-group-item>
            <b-list-group-item class="hover-items" href="#delete-account">{{ $t('profile.settings.delete_account_title') }}</b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col sm="5" lg="5" class="mt-4 mb-4" >
        <!-- <div :class="{'normalHide': normalHide}"> -->
          <b-form @submit="onSubmitPass" class="mt-4 p-3" id="password" :class="{'normalHide': normalHide}">
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
  												:class="{'form-control': true, 'error': errors.has('new_password_repeat') }">
  							</b-form-input>
  							<span>{{ errors.first('new_password_repeat') }}</span>
  					</b-form-group>
            <b-button type="submit" variant="outline-success" class="mt-2 t">{{$t('button.save')}}</b-button>
            <hr>
          </b-form>
          <b-form @submit="onSubmitEmail" class="mt-4 p-3" id="email">
            <h1 class="text-left mb-3" :class="{'normalHide': !createEmailHide}">{{ $t('profile.settings.change_email') }} </h1>
            <h1 class="text-left mb-3" :class="{'createEmailHide': createEmailHide}">{{ $t('profile.settings.create_email') }}</h1>
            <b-form-group :label="$t('registration.email')"
  												class="font-weight-bold">
  							<b-form-input name="email"
  												v-model="settings.email"
  												v-bind:placeholder="$t('registration.email')"
  												data-vv-as=" "
                          :value="user.email"
  												v-validate="'required|email'"
  												:class="{'form-control': true, 'error': errors.has('email'), 'email-error': emailError }"
  												@keyup.native="checkIfEmailExists(settings.email)">
  							</b-form-input>
  							<span>{{ errors.first('email') }}</span>
  							<span :class="{ 'hideEmailExists': hideEmailExists }">{{$t('registration.emailExists')}}</span>
              </b-form-group>
              <b-form-group :label="$t('login.password')"
    												class="font-weight-bold"
                            :class="{'createEmailHide': !createEmailHide}">
    						<b-form-input name="email_password"
    													type="password"
    													v-model="settings.email_password"
    													v-bind:placeholder="$t('login.password')"
    													data-vv-as=" "
    													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
    													:class="{'form-control': true, 'error': errors.has('email_password')}">
    						</b-form-input>
                <span>{{ errors.first('email_password') }}</span>
              </b-form-group>
              <span class="text-muted" :class="{'newEmailSpan': newEmailSpan}">{{ $t('profile.settings.email_pending') }}</span>
              <span class="text-info" :class="{'newEmailSpan': newEmailSpan}">{{user.pendingEmail}}</span><br>
              <b-button type="submit" variant="outline-success" class="mt-2">{{$t('button.save')}}</b-button>
              <hr>
          </b-form>
          <b-form @submit="onSubmitCreatePass" class="mt-4 p-3" id="create-pass" :class="{'passwordHide': passwordHide}">
            <h1 class="text-left mb-3">{{ $t('profile.settings.create_pass') }}</h1>
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
  													:class="{'form-control': true, 'error': errors.has('create_password') }">
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
  												:class="{'form-control': true, 'error': errors.has('create_password_repeat') }">
  							</b-form-input>
  							<span>{{ errors.first('create_password_repeat') }}</span>
  					</b-form-group>
            <b-button type="submit" variant="outline-success" class="mt-2">{{$t('button.save')}}</b-button>
            <hr>
        </b-form>
        <b-form @submit="onSubmitPersonal" class="mt-4 p-3" id="personal">
          <h1 class="text-left mb-3">{{ $t('profile.settings.change_info') }}</h1>
          <b-form-group :label="$t('registration.first_name')"
												class="font-weight-bold">
							<b-form-input name="first_name"
												v-model="settings.first_name"
												v-bind:placeholder="$t('registration.first_name')"
												data-vv-as=" "
                        :value="user.first_name"
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
                        :value="user.last_name"
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
          <label class="file-select">
            <img :src="user.image" height="200" alt="Image preview..."><br>
            <input type="file" @change="onFileSelected"/>
          </label><br>
        </div>
        <hr>
        <div id="social-media" class="mt-4 p-3" :class="{'socialHide': socialHide}">
          <h1 class="text-left mb-3">{{ $t('profile.settings.add_media') }}</h1>
          <b-btn class="mt-3 button" :class="{'intra': intra}" variant="dark" href='https://api.intra.42.fr/oauth/authorize?client_id=5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7&redirect_uri=http://localhost:8084/intra&response_type=code'>42 Intra</b-btn>
          <b-btn class="mt-3 button" :class="{'github': github}" variant="dark" href='https://github.com/login/oauth/authorize?client_id=1dfde4107005f390f4ff'>Github</b-btn>
          <hr>
        </div>
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
var reader  = new FileReader();
import imageCompression from 'browser-image-compression';


export default {
  name: 'UserPage',
  data () {
    return {
        settings: {
          old_password: '',
          new_password: '',
          new_password_repeat: '',
          email: '',
          email_password: '',
          first_name: '',
          last_name: ''
        },
        create: {
          password: '',
          password_repeat: '',
          email: ''
        },
        user: {
          first_name: '',
          last_name: '',
          email: '',
          pendingEmail: '',
          image: '',
          password: '',
          intra: '',
          github: ''
        },
        showSuccessAlert: false,
        showErrorAlert: false,
        showSuccessPassAlert: false,
        showErrorPassAlert: false,
        hideEmailExists: true,
        showEmailSentSuccess: false,
        newEmailSpan: true,
        emailError: false,
        omniauthHide: true,
        createEmailHide: true,
        normalHide: false,
        socialHide: false,
        passwordHide: true,
        hideButton: true,
        intra: false,
        github: false,
        headerBgVariant: 'danger',
        headerTextVariant: 'light',
        imageSelected: null,
        maxSize: 1024
      }
    },
    mounted() {
        HTTP
          .get('user/data/'+localStorage.token)
          .then(result => {
            if (result.data.success == true) {
              this.user.first_name = result.data.first
              this.user.last_name = result.data.last
              this.user.email = result.data.email
              this.user.pendingEmail = result.data.pendingEmail
              this.user.image = result.data.image
              this.user.password = result.data.password
              this.user.intra = result.data.intra
              this.user.github = result.data.github
              console.log("email: "+this.user.email+" pendingEmail: "+this.user.pendingEmail+" intra: "+this.user.intra+" git: "+this.user.github+" pass: "+this.user.password)
              if (this.user.email == null) {
                this.normalHide = true
                this.omniauthHide = false
              }
              if (this.user.intra === true) {
                this.intra = true
              }
              if (this.user.github === true) {
                this.github = true
              }
              if (this.user.github === true && this.user.intra === true) {
                this.socialHide = true
              }
              if (this.user.pendingEmail !== null) {
                this.newEmailSpan = false
              }
              if (this.user.email === null) {
                this.createEmailHide = false
              }
              if (this.user.password === false) {
                this.passwordHide = false
                this.normalHide = true
              }
              if (this.user.image === null) {
                this.user.image = "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              }
            } else if (result.data.success == false) {
              localStorage.token = ''
              this.$router.push('/')
            }
          })
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
              HTTP
                .put('user/change/data', {
                  'token': localStorage.token,
                  'oldPassword': this.settings.old_password,
                  'newPassword': this.settings.new_password,
                })
                .then (response => {
                  if (response.data.success == true) {
                    this.showSuccessPassAlert = true
                    this.showErrorAlert = false
                    this.showSuccessAlert = false
                    this.showErrorPassAlert = false
                    setTimeout(() => { localStorage.token = ''; this.$router.push('/login')}, 3000)
                  } else if (response.data.message === "Invalid oldPassword") {
                    console.log(response.data)
                    this.showErrorPassAlert = true
                    this.showErrorAlert = false
                    this.showSuccessAlert = false
                    this.showSuccessPassAlert = false
                  } else if (response.data.message === "Invalid token") {
                    localStorage.token = ''
                    this.$router.push('/')
                  } else {
                    this.showErrorPassAlert = false
                    this.showErrorAlert = true
                    this.showSuccessAlert = false
                    this.showSuccessPassAlert = false
                  }
                })
                .catch((err) => {
                  console.log(err.response.data.error.message)
                  console.log("server error")
                })
            }
          })
          .catch(() => {
            console.log('error')
          })
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
        if (this.user.email !== null) {
          this.$validator.validate('email_password', this.settings.email_password)
          this.$validator.validate('email', this.settings.email)
          .then(result => {
            if(!result) {
              console.log('error')
              return false
            } else {
              HTTP
                .put('user/change/email', {
                  'token': localStorage.token,
                  'email': this.settings.email,
                  'password': this.settings.email_password
                })
                .then (response => {
                  if (response.data.success == true) {
                    this.showEmailSentSuccess = true
                    this.newEmailSpan = false
                    this.showErrorAlert = false
                    this.user.pendingEmail = this.settings.email
                  } else if (response.data.message === "Invalid token") {
                    localStorage.token = ''
                    this.$router.push('/')
                  } else {
                    console.log(response.data)
                    this.showErrorAlert = true
                    this.showSuccessAlert = false
                  }
                })
                .catch((err) => {
                  console.log(err.response.data.error.message)
                  console.log("server error")
                })
            }
          })
          .catch(() => {
            console.log('error')
          })
        } else {
          this.$validator.validate('email', this.settings.email)
          .then(result => {
            if(!result) {
              console.log('error')
              return false
            } else {
              HTTP
                .post('user/add/email', {
                  'token': localStorage.token,
                  'email': this.settings.email
                })
                .then (response => {
                  if (response.data.success == true) {
                    this.showEmailSentSuccess = true
                    this.newEmailSpan = false
                    this.showErrorAlert = false
                    this.user.pendingEmail = this.settings.email
                  } else if (response.data.message === "Invalid token") {
                    localStorage.token = ''
                    this.$router.push('/')
                  } else {
                    console.log(response.data)
                    this.showErrorAlert = true
                    this.showSuccessAlert = false
                  }
                })
                .catch((err) => {
                  console.log(err.response.data.error.message)
                  console.log("server error")
                })
            }
          })
          .catch(() => {
            console.log('error')
          })
        }
      },
      onSubmitCreatePass(evt) {
        evt.preventDefault();
        this.$validator.validate('create_password', this.create.password)
        this.$validator.validate('create_password_repeat', this.create.password_repeat)
        .then(result => {
          if(!result) {
            console.log('error')
            return false
          }
          else {
            HTTP
              .post('user/add/password', {
                'token': localStorage.token,
                'password': this.create.password
              })
              .then (response => {
                if (response.data.success == true) {
                  this.showSuccessAlert = true
                  this.showErrorAlert = false
                } else if (response.data.message === "Invalid token") {
                  localStorage.token = ''
                  this.$router.push('/')
                } else {
                  this.showErrorAlert = true
                  this.showSuccessAlert = false
                }
              })
              .catch((err) => {
                console.log(err.response.data.error.message)
                console.log("server error")
              })
          }
        })
        .catch(() => {
          console.log('error')
        })
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
            HTTP
              .put('user/change/data', {
                'token': localStorage.token,
                'first': this.settings.first_name,
                'last': this.settings.last_name,
              })
              .then (response => {
                if (response.data.success == true) {
                  this.showSuccessAlert = true
                  this.showErrorAlert = false
                } else if (response.data.message === "Invalid token") {
                  localStorage.token = ''
                  this.$router.push('/')
                } else {
                  this.showErrorAlert = true
                  this.showSuccessAlert = false
                }
              })
              .catch((err) => {
                console.log(err.response.data.error.message)
                console.log("server error")
              })
          }
        })
        .catch(() => {
          console.log('error')
        })
      },
      showModal () {
        this.$refs.deleteAccount.show()
      },
      hideModal () {
        this.$refs.deleteAccount.hide()
      },
      deleteAccount() {
        HTTP
          .delete('user/delete/self/'+localStorage.token)
          .then (response => {
            if (response.data.success == true) {
              console.log('account deleted')
            }
              localStorage.token = ''
              window.location.href = '/'
          })
          .catch((err) => {
            console.log(err.response.data.error.message)
            console.log("server error")
          })
        this.hideModal()
      },
      Upload() {
        // console.log(reader.result)
        // this.compressImg(reader.result)
        HTTP
          .put('user/change/image', {
            'image': reader.result,
            'token': localStorage.token
          })
          .then (response => {
            if (response.data.success == true) {
              this.showSuccessAlert = true
              this.showErrorAlert = false
            } else if (response.data.message === "Invalid token") {
              localStorage.token = ''
              this.$router.push('/')
            } else {
              this.showErrorAlert = true
              this.showSuccessAlert = false
            }
          })
          .catch((err) => {
            console.log(err.response.data.error.message)
            console.log("server error")
          })
        console.log('img uploaded')
      },
    onFileSelected(event) {

        var imageFile = event.target.files[0];
        var preview = document.querySelector('img');

        if(imageFile.name.length > 0) {
          console.log('ty durak')
              if (!imageFile.type.match('image.*')) {
                console.log('lol, not an image')
              } else {
                console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
                console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

                var maxSizeMB = 1;
                var maxWidthOrHeight = 300; // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight
                imageCompression(imageFile, maxSizeMB, maxWidthOrHeight) // maxSizeMB, maxWidthOrHeight are optional
                  .then(function (compressedFile) {
                    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

                    reader.readAsDataURL(compressedFile);
                    reader.addEventListener("load", function () {
                            console.log("res: "+reader.result)
                            preview.src = reader.result
                            this.fileUploaded = reader.result
                            HTTP
                              .put('user/change/image', {
                                'image': reader.result,
                                'token': localStorage.token
                              })
                              .then (response => {
                                if (response.data.success == true) {
                                  this.showSuccessAlert = true
                                  this.showErrorAlert = false
                                } else if (response.data.message === "Invalid token") {
                                  localStorage.token = ''
                                  this.$router.push('/')
                                } else {
                                  this.showErrorAlert = true
                                  this.showSuccessAlert = false
                                }
                              })
                              .catch((err) => {
                                console.log(err.response.data.error.message)
                                console.log("server error")
                              })
                            console.log('img uploaded')
                          })
                  })
                  .catch(function (error) {
                    console.log(error.message);
                  });
                }
      } else {
        console.log('you fucked up')
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

.hideEmailExists,
.omniauthHide,
.normalHide,
.intra,
.github,
.socialHide,
.newEmailSpan,
.createEmailHide,
.passwordHide {
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

.button {
  color: white;
}

.button:hover {
  color: #606266;
}

.file-select {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.file-select img {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.file-select > input[type="file"] {
  display: none;
}

</style>
