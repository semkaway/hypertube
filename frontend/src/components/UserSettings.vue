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
					<span class='subheading dark--text'>{{section.title}}</span>
				</v-layout>
				<v-card>
					<v-card-text>

						<!-- CHANGE EMAIL TODO: vash email in i18n-->
						<form v-if='section.name == "email"'>
						<v-layout align-start column fill-height>
								<v-layout class="grey--text">
									<v-card class="grey--text">
										<v-card-text class='subheading'>Ваш текущий e-mail:  <span class='ml-1 subheading'>{{settingsUser.email}}</span></v-card-text>
									</v-card>
								</v-layout>
								<!-- show it if have pending email -->
								<v-layout class="grey--text">
									<v-card class="grey--text">
										<v-card-text class='subheading'>
											{{$t('profile.settings.email_pending')}} 
											<span class='ml-1 subheading'>lala@gmail.com</span>
											<v-btn color="red" class="white--text" flat>{{ $t('button.cancel') }}</v-btn>
										</v-card-text>
									</v-card>
								</v-layout>
						</v-layout>

							
							<v-text-field
								@keyup.native='validateEmail("newEmail")'
								name='newEmail'
								v-model='newEmail'
								:label="$t('registration.email')"
								class='ml-3'
								color="grey darken-1"
								v-validate="'email'"
								:error-messages='arrayOfNewEmailErrors'>
							</v-text-field>
							<v-btn @click='changeEmail("newEmail")' color="grey" class="white--text ml-3" flat>{{ $t('button.save') }}</v-btn>
							<v-btn @click='clearNewEmail' color="grey" class="white--text" flat>{{ $t('button.reset') }}</v-btn>
						</form>

						<!-- CHANGE PERSONAL DATA -->
						<form v-if='section.name == "names"'>
								<v-text-field
									@keyup.native='validateFirstName'
									name='newFirstName'
									v-model='newFirstName'
									:label="$t('registration.first_name')"
									class='ml-3'
									color="grey darken-1"
									v-validate="'alpha|min:3|max:15'"
									:error-messages='arrayOfFirstNameErrors' 
                					:counter='15'>
								</v-text-field>
								<v-text-field
									@keyup.native='validateLastName'
									name='newLastName'
									v-model='newLastName'
									:error-messages='arrayOfLastNameErrors'
									:label="$t('registration.last_name')"
									class='ml-3'
									color="grey darken-1"
									v-validate="'alpha|min:3|max:15'"
                					:counter='15'>
								</v-text-field>
								<v-btn @click='onChangeNames' color="grey" class="white--text ml-3" flat>{{ $t('button.save') }}</v-btn>
								<v-btn @click='clearNameFields' color="grey" class="white--text" flat>{{ $t('button.reset') }}</v-btn>
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

						<!-- ADD EMAIL TODO: show it only if user doesnt have email -->

						<form v-if='section.name == "addEmail"'>
							<v-text-field
								@keyup.native='validateEmail("addEmail")'
								name='addEmail'
								v-model='addEmail'  
								color="grey darken-1" 
								class='ml-3'
								:error-messages='arrayOfAddEmailErrors'
								v-validate="'email'"
								:label="$t('registration.email')">
							</v-text-field>
							<v-btn @click='changeEmail("addEmail")' color="grey" class="white--text" flat>{{ $t('button.save') }}</v-btn>
							<v-btn @click='clearAddEmailSection' color="grey" class="white--text" flat>{{ $t('button.reset') }}</v-btn>
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
import setAuthorizationToken from '../utils/setAuthToken'
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
			newEmail: '',
			addEmail: '',
			password: '',
			newPassword: '',
			repeatNewPassword: '',
			addNewPassword: '',
			newFirstName: '',
			newLastName: '',
			arrayOfFirstNameErrors: [],
			arrayOfLastNameErrors: [],
			arrayOfAddNewPasswordErrors: [],
			arrayOfImageURLerrors: [],
			arrayOfPasswordErrors: [],
			arrayOfNewPasswordErrors: [],
			arrayOfRepeatPasswordErrors: [],
			arrayOfNewEmailErrors: [],
			arrayOfAddEmailErrors: [],
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
				{ title: this.$t('profile.settings.create_email'), icon: 'alternate_email', name: 'addEmail'},
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

		clearAddEmailSection() {
			this.addEmail = ''
			this.arrayOfAddEmailErrors = []

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
			this.arrayOfAddNewPasswordErrors = []
		},

		onSaveAddNewPassword() {
			if (!this.arrayOfAddNewPasswordErrors.length && this.addNewPassword.length) {
				this.runLoader = true
				HTTP.post('user/add/password', { password: this.addNewPassword}).then((response) => {
					console.log('response')
					if (response.data.success) {
						this.showSnackbar = true
						this.snackbarText = this.$t('profile.success_alert')
						this.resetAddNewPassword()
					} else {
						if (response.data.message === 'Invalid password') {
							this.arrayOfAddNewPasswordErrors =  [this.$t('validation.wrongFormat')]
						} else {
							setAuthorizationToken(false)
							this.$router.push('/')
						}
					}
					
					this.runLoader = false
					
				}).catch((error) => {
					this.runLoader = false
					this.showSnackbar = true
					this.snackbarText = this.$t('login.error_alert')
					this.resetAddNewPassword()
				})
			}
		},

		clearNameFields() {
			this.newFirstName = ''
			this.newLastName = ''
			this.arrayOfFirstNameErrors = []
			this.arrayOfLastNameErrors = []
		},

		changeEmail(section) {
			if (section === 'newEmail') {
				// validate new email field
			} else if (section === 'addEmail') {
				// validate add email field
			}
		},

		clearNewEmail() {
			this.newEmail = ''
			this.arrayOfNewEmailErrors = []
		},

		validateFirstName() {
			if (this.errors.has('newFirstName')) {
				if (this.newFirstName.length > 15) {
					this.arrayOfFirstNameErrors = [this.$t('validation.firstNameLong')]
				} else	if (this.newFirstName.length < 3){
					this.arrayOfFirstNameErrors = [this.$t('validation.firstNameShort')]
				} else {
					this.arrayOfFirstNameErrors =  [this.$t('validation.firstNameFormat')]
				}
			} else {
				this.arrayOfFirstNameErrors = []
			}
		},

		validateLastName() {
			if (this.errors.has('newLastName')) {
				if (this.newLastName.length > 15) {
					this.arrayOfLastNameErrors = [this.$t('validation.firstNameLong')] 
				} else if (this.newLastName.length < 3){
					this.arrayOfLastNameErrors = [this.$t('validation.firstNameShort')]
				} else {
					this.arrayOfLastNameErrors = [this.$t('validation.firstNameFormat')]
				}
			} else {
				this.arrayOfLastNameErrors = []
			}
		},

		validateEmail(field) {
			if (field === 'newEmail') {
				if (this.errors.has('newEmail')) {
					this.arrayOfNewEmailErrors = [this.$t('validation.email')]
				} else {
					this.arrayOfNewEmailErrors = []
				}
			} else if (field === 'addEmail') {
				if (this.errors.has('addEmail')) {
					this.arrayOfAddEmailErrors = [this.$t('validation.email')]
				} else {
					this.arrayOfAddEmailErrors = []
				}
			}
			
		},

		onChangeNames() {
			if (!this.arrayOfFirstNameErrors.length && !this.arrayOfLastNameErrors.length && (this.newFirstName.length || this.newLastName.length)) {
				this.runLoader = true
				const first = this.newFirstName.length ? this.newFirstName : this.settingsUser.first
				const last = this.newLastName.length ? this.newLastName : this.settingsUser.last
				HTTP.put('user/change/data', { first, last }).then((response) => {
					this.runLoader = false
					if (response.data.success) {
						this.clearNameFields()
						this.showSnackbar = true
						this.snackbarText = this.$t('profile.success_alert')
						this.$emit('updateUser', { first, last })
					} else {
						switch(response.data.message)
						{
							case 'Invalid first':
								this.arrayOfFirstNameErrors =  [this.$t('validation.firstNameFormat')]
								break
							case 'Invalid last':
								this.arrayOfFirstNameErrors =  [this.$t('validation.lastNameFormat')]
								break
							case 'Invalid token':
								setAuthorizationToken(false)
								this.$router.push('/')
								break
							default: {
								this.showSnackbar = true
								this.snackbarText = this.$t('activation.error_alert')
							}
						}
					}
				}).catch((error) => {
					this.runLoader = false
					this.showSnackbar = true
					this.snackbarText = this.$t('activation.error_alert')
				})
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

</script>

<style scoped>
	.cursor-pointer:hover {
		cursor: pointer;
	}
</style>