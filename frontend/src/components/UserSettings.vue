<template>
	<v-container  class="mt-5">

 		<Loader :run='runLoader'/>
		<Snackbar :show='showSnackbar' :text='snackbarText' :y='snackbarY' :x='snackbarX' v-on:closeSnackbar='showSnackbar = false' :timeout='snackbarTimeout'/>

		<ModalWindow 
			:show='showModal'
			:headerText='$t("profile.settings.delete_account_title")' 
			:text='$t("profile.settings.delete_account_text")'
			:agreeButtonText='$t("button.delete")'
			:disagreeButtonText='$t("button.cancel")'
			v-on:disagree='onDisagree'
			v-on:agree='onAgree'
		/>

 		<v-expansion-panel  expand class="mt-4">
    		<v-expansion-panel-content v-for="(section, index) in sections" :key="index" expand-icon="keyboard_arrow_down">
				<v-layout slot="header" align-center>
					<v-icon class='mr-3'>{{section.icon}}</v-icon> 
					<span>{{section.title}}</span>
				</v-layout>
				<v-card>
					<v-card-text>

						<!-- CHANGE PERSONAL DATA -->
						<form v-if='section.name == "names"'>
								<v-text-field 
									class='ml-3'
									color="grey darken-1">
								</v-text-field>
								<v-text-field 
									class='ml-3'
									color="grey darken-1">
								</v-text-field>
								<v-btn color="grey" class="white--text ml-3" flat>{{ $t('button.save') }}</v-btn>
								<v-btn color="grey" class="white--text" flat>{{ $t('button.reset') }}</v-btn>
						</form>

						<!-- CHANGE PASSWORD -->
						<form v-if='section.name == "password"'>
							<v-text-field
								class='ml-3'
								:label="$t('profile.settings.old_password')"
								@keyup.native='validatePassword'
								:error-messages="arrayOfPasswordErrors" 
								name='password'
								v-model="password" 
								color="grey darken-1"
								:type="showPassword ? 'text' : 'password'" 
								:append-icon="showPassword ? 'visibility_off' : 'visibility'"
								@click:append="showPassword = !showPassword"
								v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}">
							</v-text-field>
							<v-text-field
								class='ml-3'
								:hint="$t('validation.passwordHint')"
								:label="$t('profile.settings.new_password')"
								@keyup.native='validatePassword'
								:error-messages="arrayOfNewPasswordErrors" 
								v-model="newPassword"
								ref="newPasswordRef"
								:type="showPassword ? 'text' : 'password'" 
								color="grey darken-1"
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
								color="grey darken-1"
								name='repeatNewPassword'
								v-validate="'required|confirmed:newPasswordRef'">
							</v-text-field>
							<v-btn @click='changePassword' color="grey" class="white--text ml-3" flat>{{ $t('button.save') }}</v-btn>
							<v-btn @click='clearFields(section.name)' color="grey" class="white--text" flat>{{ $t('button.reset') }}</v-btn>
						</form>


						<!-- CHANGE IMAGE -->
						<form v-if='section.name == "picture"'>
							<v-text-field
								color="grey darken-1"
								v-model="imgURL"
								class='ml-3'
								:label="$t('profile.settings.enter_url')"
								hint='https://images.pexels.com/photos/1616227/pexels-photo-1616227.jpeg'
								v-validate="'url:require_protocol'"
								name='imgURL'
								:error-messages='arrayOfImageURLerrors'
								@keyup="onURLPicture">
							</v-text-field>
							<div class='subheading mt-3  ml-3 grey--text'>{{$t('profile.settings.click')}}</div>
							<v-hover>
								<v-card @click="$refs.fileInput[0].click()" slot-scope="{ hover }" :class="`ml-3 mt-3 mb-3 cursor-pointer rounded elevation-${hover ? 12 : 2}`" width="200px" height='200px'>
									<v-img 
										class='rounded'
										:aspect-ratio="16/9" 
										height='200px' 
										width='200px' 
										:src="imgToShow" 
										alt="User photo"
										ref='imagePreview'>
									</v-img>
								</v-card>
							</v-hover>
							<input ref='fileInput' style='display: none;' type="file" accept="image/png, image/jpeg" @change="onFilePicture"/>
							<v-btn @click='onSaveNewImage' color="grey" class="white--text ml-3" flat>{{ $t('button.save') }}</v-btn>
							<v-btn @click='resetImage' color="grey" class="white--text ml-3" flat>{{ $t('button.reset') }}</v-btn>
						</form>

						<!-- ADD MEDIA -->
						<v-btn v-if='section.name == "media"' color="grey darken-1" class="white--text" flat>42 Intra</v-btn>
						<v-btn v-if='section.name == "media"' color="grey darken-1" class="white--text" flat>github</v-btn>


						<!-- ADD PASSWORD  TODO: show it only if user doesnt have password -->
						<form v-if='section.name == "addPass"'>
							<v-text-field
								name='addNewPassword'
								@keyup.native='validatePassword'
								:hint="$t('validation.passwordHint')"
								v-model='addNewPassword' 
								:error-messages='arrayOfAddNewPasswordErrors' 
								color="grey darken-1" 
								class='ml-3'
								:label="$t('profile.settings.new_password')" 
								@click:append="showPassword = !showPassword" 
								:type="showPassword ? 'text' : 'password'" 
								:append-icon="showPassword ? 'visibility_off' : 'visibility'"
								v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}">
							</v-text-field>
							<v-btn @click='onSaveAddNewPassword' color="grey" class="white--text" flat>{{ $t('button.save') }}</v-btn>
							<v-btn @click='resetAddNewPassword' color="grey" class="white--text" flat>{{ $t('button.reset') }}</v-btn>
						</form>

						<!-- DELETE -->
						<v-btn v-if='section.name == "delete"' @click='deleteAccount' color="red" class="white--text" flat>{{ $t('profile.settings.delete_account_title') }}</v-btn>
					</v-card-text>
				</v-card>
    		</v-expansion-panel-content>
  		</v-expansion-panel>
	</v-container>
</template>



<script>

import { HTTP } from '../http-common'
import isImage from '../utils/isImage'
import getBase64 from '../utils/getBase64'
import Loader from './Loader'
import Snackbar from './Snackbar'
import ModalWindow from './ModalWindow'
import imageCompression from 'browser-image-compression'

export default {
	name: 'UserSettings',
	props: ['locale', 'user'],
	components: { Loader, Snackbar, ModalWindow },
	data () {
		return {
			runLoader: false,
			showPassword: false,
			settingsUser: this.user,
			locale1: this.locale,
			sections: this.getSections(),
			originalImg: this.user.image,
			imgToShow: this.user.image,
			imgURL: '',
			password: '',
			newPassword: '',
			repeatNewPassword: '',
			addNewPassword: '',
			arrayOfAddNewPasswordErrors: [],
			arrayOfImageURLerrors: [],
			arrayOfPasswordErrors: [],
			arrayOfNewPasswordErrors: [],
			arrayOfRepeatPasswordErrors: [],
			showSnackbar: false,
			showModal: false,
			snackbarY: 'bottom',
			snackbarX: 'right',
			snackbarText: '',
			snackbarTimeout: 3000
		}
	},

	methods: {
		getSections() {
			return [
				{ title: this.$t('profile.settings.change_email'), icon: 'email', name: 'email'},
				{ title: this.$t('profile.settings.change_password'), icon: 'lock', name: 'password'},
				{ title: this.$t('profile.settings.change_info'), icon: 'person', name: 'names'},
				{ title: this.$t('profile.settings.change_picture'), icon: 'perm_media', name: 'picture'},
				{ title: this.$t('profile.settings.add_media'), icon: 'person_add', name: 'media'},
				{ title: this.$t('profile.settings.create_pass'), icon: 'fingerprint', name: 'addPass'},
				{ title: this.$t('profile.settings.delete_account_title'), icon: 'delete', name: 'delete'}
			]
		},

		validatePassword(e) {
			const fieldName =  e.target.attributes.name.nodeValue
			if (fieldName === 'password') {
				this.arrayOfPasswordErrors = this.errors.has('password') ? this.password.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')] : []
			} else if (fieldName === 'newPassword') {
				this.arrayOfNewPasswordErrors = this.errors.has('newPassword') ? this.newPassword.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')] : []
			} else if (fieldName === 'repeatNewPassword') {
				this.arrayOfRepeatPasswordErrors = this.errors.has('repeatNewPassword') ? this.repeatNewPassword.length ? [this.$t('validation.repeatPassword')] : [this.$t('validation.required')] : []
			} else if (fieldName === 'addNewPassword') {
				this.arrayOfAddNewPasswordErrors = this.errors.has('addNewPassword') ? this.addNewPassword.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')] : []
			}
		},

		clearFields(section) {
			if (section === 'password') {
				this.password = ''
				this.newPassword = ''
				this.repeatNewPassword = ''
				this.arrayOfPasswordErrors = []
				this.arrayOfNewPasswordErrors = []
				this.arrayOfRepeatPasswordErrors = []
			}
		},

		changePassword() {
			if (!this.arrayOfPasswordErrors.length && !this.arrayOfNewPasswordErrors.length && 
			!this.arrayOfRepeatPasswordErrors.length && this.newPassword.length && this.password.length) {
				const newPassword = {
					oldPassword: this.password,
					newPassword: this.newPassword
				}
				this.runLoader = true
				HTTP.put('user/change/data', newPassword).then((response) => {
					console.log('response', response)
					this.runLoader = false
					if (!response.data.success) {
						if (response.data.message === 'Invalid oldPassword') {
							this.arrayOfPasswordErrors = [this.$t('validation.invalidPassword')]
						}
					} else {
						this.snackbarText = this.$t('forgot_password.restore_pass_success_title')
						this.showSnackbar = true
						this.clearFields('password')
					}
				}).catch((error) => {
					this.runLoader = false
					this.showSnackbar = true
					this.snackbarText = this.$t('activation.error_alert')
				})
			}
		},

		deleteAccount() { this.showModal = true},
		onDisagree() { this.showModal = false },
		onAgree() {
			this.showModal = false
			// send to the server delete account action 
		},

		onURLPicture() {
			if (this.errors.has('imgURL') && this.imgURL.length) {
				this.imgToShow = this.originalImg
				this.arrayOfImageURLerrors = [this.$t('profile.settings.pictureError')]
			} else if (this.imgURL.length) {
				this.runLoader = true
				this.arrayOfImageURLerrors = []
				isImage(this.imgURL).then((resp) => {
					this.runLoader = false
					this.imgToShow = this.imgURL
				}).catch((e) => {
					this.runLoader = false
					this.imgToShow = this.originalImg
					this.arrayOfImageURLerrors = [this.$t('profile.settings.pictureError')]
				})
			} else {
				this.arrayOfImageURLerrors = []
			}
		},

		onFilePicture() {
			this.runLoader = true
			const file = this.$refs.fileInput[0].files[0]
			const mbSize = file.size / 1024 / 1024
			if (mbSize > 5 || file.size < 100) {
				this.runLoader = false
				this.showSnackbar = true
				this.snackbarText = this.$t('profile.settings.pictureError')
			} else {
				const maxSizeMB = 1;
                const maxWidthOrHeight = 300;
                imageCompression(file, maxSizeMB, maxWidthOrHeight).then((compressedFile) => {
					getBase64(compressedFile).then((baseString) => {
						this.imgToShow = baseString
						this.runLoader = false
					}).catch((e) => { 
						this.runLoader = false 
						this.showSnackbar = true
						this.snackbarText = this.$t('profile.settings.pictureError')
					})
                }).catch((error) => {
					this.runLoader = false 
					this.showSnackbar = true
					this.snackbarText = this.$t('profile.settings.pictureError')
				})
            }
		},

		onSaveNewImage() {
			if (this.originalImg === this.imgToShow)
				return
			this.originalImg = this.imgToShow
			this.runLoader = true
			HTTP.put('user/change/image', { image: this.originalImg }).then((response) => {
				if (!response.data.success) {
					setAuthorizationToken(false)
					this.$router.push('/')
				}
				this.showSnackbar = true
				this.snackbarText = this.$t('profile.success_alert')
				this.runLoader = false
				this.resetImage()
				this.$emit('updateUser', {image: this.originalImg})
			}).catch((error) => {
				this.showSnackbar = true
				this.snackbarText = this.$t('activation.error_alert')
				this.runLoader = false
			})
		},

		resetImage() {
			this.imgURL = ''
			this.arrayOfImageURLerrors = []
			this.imgToShow = this.originalImg
			this.$refs.fileInput[0].files = null
		},

		resetAddNewPassword() {
			this.addNewPassword = ''
		},

		onSaveAddNewPassword() {
			if (!this.arrayOfAddNewPasswordErrors.length && this.addNewPassword.length) {
				// add password to account
				console.log("add new password =>", this.addNewPassword)
			}
		}
	},


	computed: {
			closeSnackbar() { this.showSnackbar = false }
	},

	watch: {
		locale () { this.sections = this.getSections() },
		user() {
			this.settingsUser = this.user
			this.originalImg = this.settingsUser.image
			this.imgToShow = this.settingsUser.image
		}
	}
}

// export default {
//   name: 'UserPage',
//   data () {
//     return {
//         settings: {
//           old_password: '',
//           new_password: '',
//           new_password_repeat: '',
//           email: '',
//           email_password: '',
//           first_name: '',
//           last_name: ''
//         },
//         create: {
//           password: '',
//           password_repeat: '',
//           email: ''
//         },
//         user: {
//           first_name: '',
//           last_name: '',
//           email: '',
//           pendingEmail: '',
//           image: '',
//           password: '',
//           intra: '',
//           github: ''
//         },
//         img_url: '',
//         showSuccessAlert: false,
//         showErrorAlert: false,
//         showSuccessPassAlert: false,
//         showErrorPassAlert: false,
//         hideEmailExists: true,
//         showEmailSentSuccess: false,
//         newEmailSpan: true,
//         emailError: false,
//         omniauthHide: true,
//         createEmailHide: true,
//         normalHide: false,
//         socialHide: false,
//         passwordHide: true,
//         hideButton: true,
//         intra: false,
//         github: false,
//         headerBgVariant: 'danger',
//         headerTextVariant: 'light',
//         imageSelected: null,
//         maxSize: 1024
//       }
//     },
//     mounted() {
//         HTTP
//           .get('user/data/')
//           .then(result => {
//             console.log(result)
//             if (result.data.success == true) {
//               this.user.first_name = result.data.first
//               this.user.last_name = result.data.last
//               this.user.email = result.data.email
//               this.user.pendingEmail = result.data.pendingEmail
//               this.user.image = result.data.image
//               this.user.password = result.data.password
//               this.user.intra = result.data.intra
//               this.user.github = result.data.github
//               console.log("email: "+this.user.email+" pendingEmail: "+this.user.pendingEmail+" intra: "+this.user.intra+" git: "+this.user.github+" pass: "+this.user.password)
//               if (this.user.email == null) {
//                 this.normalHide = true
//                 this.omniauthHide = false
//               }
//               if (this.user.intra === true) {
//                 this.intra = true
//               }
//               if (this.user.github === true) {
//                 this.github = true
//               }
//               if (this.user.github === true && this.user.intra === true) {
//                 this.socialHide = true
//               }
//               if (this.user.pendingEmail !== null) {
//                 this.newEmailSpan = false
//               }
//               if (this.user.email === null) {
//                 this.createEmailHide = false
//               }
//               if (this.user.password === false) {
//                 this.passwordHide = false
//                 this.normalHide = true
//               }
//               if (this.user.image === null) {
//                 this.user.image = "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//               }
//             } else if (result.data.success == false) {
//               localStorage.token = ''
//               this.$router.push('/')
//             }
//           })
//           .catch((err) => {
//             console.log(err)
//             localStorage.token = ''
//             this.$router.push('/')
//           })
//       },
//     methods: {
//       logout() {
//         localStorage.token = ''
//         this.$router.push('/')
//       },
//       onSubmitPass(evt) {
//           evt.preventDefault();
//           this.$validator.validate('old_password', this.settings.old_password)
//           this.$validator.validate('new_password', this.settings.new_password)
//           this.$validator.validate('new_password_repeat', this.settings.new_password_repeat)

//           .then(result => {
//             if(!result) {
//               console.log('error')
//               return false
//             }
//             else {
//               HTTP
//                 .put('user/change/data', {
//                   // 'token': localStorage.token,
//                   'oldPassword': this.settings.old_password,
//                   'newPassword': this.settings.new_password,
//                 })
//                 .then (response => {
//                   if (response.data.success == true) {
//                     this.showSuccessPassAlert = true
//                     this.showErrorAlert = false
//                     this.showSuccessAlert = false
//                     this.showErrorPassAlert = false
//                     setTimeout(() => { localStorage.token = ''; this.$router.push('/login')}, 3000)
//                   } else if (response.data.message === "Invalid oldPassword") {
//                     console.log(response.data)
//                     this.showErrorPassAlert = true
//                     this.showErrorAlert = false
//                     this.showSuccessAlert = false
//                     this.showSuccessPassAlert = false
//                   } else if (response.data.message === "Invalid token") {
//                     localStorage.token = ''
//                     this.$router.push('/')
//                   } else {
//                     this.showErrorPassAlert = false
//                     this.showErrorAlert = true
//                     this.showSuccessAlert = false
//                     this.showSuccessPassAlert = false
//                   }
//                 })
//                 .catch((err) => {
//                   console.log(err.response.data.error.message)
//                   console.log("server error")
//                   localStorage.token = ''
//                   this.$router.push('/')
//                 })
//             }
//           })
//           .catch(() => {
//             console.log('error')
//             localStorage.token = ''
//             this.$router.push('/')
//           })
//       },
//       checkIfEmailExists(email) {
//   			HTTP
//   			.get(`user/check-email/`+email)
//   			.then(response => {
//   				if (response.data.exist == true) {
//   					  this.hideEmailExists = false
//               this.emailError = true
//   				} else if (response.data.exist == false) {
//               this.hideEmailExists = true
//               this.emailError = false
//   				}
//   				console.log(response.data.exist)
//   			})
//   			.catch((err) => {
//   				console.log(err.response.data.error)
//   				console.log("server error")
//           localStorage.token = ''
//           this.$router.push('/')
//   			})
//   		},
//       onSubmitEmail(evt) {
//         evt.preventDefault();
//         if (this.user.email !== null) {
//           this.$validator.validate('email_password', this.settings.email_password)
//           this.$validator.validate('email', this.settings.email)
//           .then(result => {
//             if(!result) {
//               console.log('error')
//               return false
//             } else {
//               HTTP
//                 .put('user/change/email', {
//                   // 'token': localStorage.token,
//                   'email': this.settings.email,
//                   'password': this.settings.email_password
//                 })
//                 .then (response => {
//                   if (response.data.success == true) {
//                     this.showEmailSentSuccess = true
//                     this.newEmailSpan = false
//                     this.showErrorAlert = false
//                     this.user.pendingEmail = this.settings.email
//                   } else if (response.data.message === "Invalid token") {
//                     localStorage.token = ''
//                     this.$router.push('/')
//                   } else {
//                     console.log(response.data)
//                     this.showErrorAlert = true
//                     this.showSuccessAlert = false
//                   }
//                 })
//                 .catch((err) => {
//                   console.log(err.response.data.error.message)
//                   console.log("server error")
//                   localStorage.token = ''
//                   this.$router.push('/')
//                 })
//             }
//           })
//           .catch(() => {
//             console.log('error')
//             localStorage.token = ''
//             this.$router.push('/')
//           })
//         } else {
//           this.$validator.validate('email', this.settings.email)
//           .then(result => {
//             if(!result) {
//               console.log('error')
//               return false
//             } else {
//               HTTP
//                 .post('user/add/email', {
//                   // 'token': localStorage.token,
//                   'email': this.settings.email
//                 })
//                 .then (response => {
//                   if (response.data.success == true) {
//                     this.showEmailSentSuccess = true
//                     this.newEmailSpan = false
//                     this.showErrorAlert = false
//                     this.user.pendingEmail = this.settings.email
//                   } else if (response.data.message === "Invalid token") {
//                     localStorage.token = ''
//                     this.$router.push('/')
//                   } else {
//                     console.log(response.data)
//                     this.showErrorAlert = true
//                     this.showSuccessAlert = false
//                   }
//                 })
//                 .catch((err) => {
//                   console.log(err.response.data.error.message)
//                   console.log("server error")
//                   localStorage.token = ''
//                   this.$router.push('/')
//                 })
//             }
//           })
//           .catch(() => {
//             console.log('error')
//             localStorage.token = ''
//             this.$router.push('/')
//           })
//         }
//       },
//       deleteEmail() {
//         HTTP
//           .delete('user/delete/pending-email')
//           .then (response => {
//             if (response.data.success == true) {
//               this.newEmailSpan = true
//             } else if (response.data.message === "Invalid token") {
//               localStorage.token = ''
//               this.$router.push('/')
//             } else {
//               console.log(response.data)
//               this.showErrorAlert = true
//               this.showSuccessAlert = false
//             }
//           })
//           .catch((err) => {
//             console.log(err.response.data.error.message)
//             console.log("server error")
//             localStorage.token = ''
//             this.$router.push('/')
//           })
//       },
//       onSubmitCreatePass(evt) {
//         evt.preventDefault();
//         this.$validator.validate('create_password', this.create.password)
//         this.$validator.validate('create_password_repeat', this.create.password_repeat)
//         .then(result => {
//           if(!result) {
//             console.log('error')
//             return false
//           }
//           else {
//             HTTP
//               .post('user/add/password', {
//                 // 'token': localStorage.token,
//                 'password': this.create.password
//               })
//               .then (response => {
//                 if (response.data.success == true) {
//                   this.showSuccessAlert = true
//                   this.showErrorAlert = false
//                 } else if (response.data.message === "Invalid token") {
//                   localStorage.token = ''
//                   this.$router.push('/')
//                 } else {
//                   this.showErrorAlert = true
//                   this.showSuccessAlert = false
//                 }
//               })
//               .catch((err) => {
//                 console.log(err.response.data.error.message)
//                 console.log("server error")
//                 localStorage.token = ''
//                 this.$router.push('/')
//               })
//           }
//         })
//         .catch(() => {
//           console.log('error')
//           localStorage.token = ''
//           this.$router.push('/')
//         })
//       },
//       onSubmitPersonal(evt) {
//         evt.preventDefault();
//         this.$validator.validate('first_name', this.settings.first_name)
//         this.$validator.validate('last_name', this.settings.last_name)
//         .then(result => {
//           if(!result) {
//             console.log('error')
//             return false
//           }
//           else {
//             HTTP
//               .put('user/change/data', {
//                 'first': this.settings.first_name,
//                 'last': this.settings.last_name,
//               })
//               .then (response => {
//                 if (response.data.success == true) {
//                   this.showSuccessAlert = true
//                   this.showErrorAlert = false
//                 } else if (response.data.message === "Invalid token") {
//                   localStorage.token = ''
//                   this.$router.push('/')
//                 } else {
//                   this.showErrorAlert = true
//                   this.showSuccessAlert = false
//                 }
//               })
//               .catch((err) => {
//                 console.log(err.response.data.error.message)
//                 console.log("server error")
//                 localStorage.token = ''
//                 this.$router.push('/')
//               })
//           }
//         })
//         .catch(() => {
//           console.log('error')
//           localStorage.token = ''
//           this.$router.push('/')
//         })
//       },
//       showModal () {
//         this.$refs.deleteAccount.show()
//       },
//       hideModal () {
//         this.$refs.deleteAccount.hide()
//       },
//       deleteAccount() {
//         HTTP
//           .delete('user/delete/self/')
//           .then (response => {
//             if (response.data.success == true) {
//               console.log('account deleted')
//             }
//               localStorage.token = ''
//               window.location.href = '/'
//           })
//           .catch((err) => {
//             console.log(err.response.data.error.message)
//             console.log("server error")
//             localStorage.token = ''
//             this.$router.push('/')
//           })
//         this.hideModal()
//       },
//       Upload() {
//         if (this.imageSelected === null) {
//           this.imageSelected = reader.result
//         }
//         console.log(this.imageSelected)
//           HTTP
//             .put('user/change/image', {
//               'image': this.imageSelected
//             })
//             .then (response => {
//               if (response.data.success == true) {
//                 this.showSuccessAlert = true
//                 this.showErrorAlert = false
//                 console.log('img uploaded')
//               } else if (response.data.message === "Invalid token") {
//                 localStorage.token = ''
//                 this.$router.push('/')
//               } else {
//                 this.showErrorAlert = true
//                 this.showSuccessAlert = false
//               }
//             })
//             .catch((err) => {
//               console.log(err.response.data.error.message)
//               console.log("server error")
//               localStorage.token = ''
//               this.$router.push('/')
//             })
//       },
//       onFileSelected(event) {
//         var preview = document.querySelector('img');

//         if (event.target !== undefined && event.target.files !== null) {
//           var imageFile = event.target.files[0];

//           if(imageFile.name.length > 0) {
//                 if (!imageFile.type.match('image.*')) {
//                   console.log('lol, not an image')
//                 } else {
//                   var maxSizeMB = 1;
//                   var maxWidthOrHeight = 300;
//                   imageCompression(imageFile, maxSizeMB, maxWidthOrHeight)
//                     .then(function (compressedFile) {
//                       reader.readAsDataURL(compressedFile);
//                       reader.addEventListener("load", function () {
//                               preview.src = reader.result
//                             })
//                     })
//                     .catch(function (error) {
//                       console.log(error.message);
//                       localStorage.token = ''
//                       this.$router.push('/')
//                     });
//                   }
//                   this.imageSelected = reader.result
//                   console.log(reader.result)
//                   this.hideButton = false
//         } else {
//           console.log('you fucked up')
//         }
//       } else {
//         this.$validator.validate('img_url', this.img_url)
//         .then(result => {
//           if(!result) {
//             console.log('error')
//             return false
//           } else {
//             preview.src = this.img_url
//             this.imageSelected = preview.src
//             this.hideButton = false
//           }
//         })
//       }
//     }
//   }

//   }

</script>

<style scoped>
.cursor-pointer:hover {
	cursor: pointer;
}
</style>