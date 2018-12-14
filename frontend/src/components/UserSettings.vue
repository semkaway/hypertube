<template>
	<v-container v-if='userLoggedIn == true' class="mt-5">

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

		<v-dialog v-model="showLangRadio" max-width="300px">
			<v-card>
				<v-card-title class='pb-0 mb-0 pl-4'> <h3 class="headline mb-0">{{ $t('button.language') }}</h3> </v-card-title>
				<v-container justify-center class='pt-0 mt-0 pb-0 mb-0'>
					<v-radio-group v-model="settingsLocale" >
						<v-radio color='grey' label="English" value="en"></v-radio>
						<v-radio color='grey' label="Русский" value="ru"></v-radio>
						<v-radio color='grey' label="Українська" value="uk"></v-radio>
					</v-radio-group>
				</v-container>
				<v-card-actions class='pl-4'>
					<v-btn color="blue-grey darken-2"	dark style="outline: none;" flat @click="changeLanguage">{{$t('button.save')}}</v-btn>
					<v-btn color="grey" class="white--text" style="outline: none;" flat @click="showLangRadio = false; settingsLocale = locale">{{$t('button.cancel')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

 		<v-expansion-panel  expand class="mt-4">
    		<v-expansion-panel-content v-for="(section, index) in sections" :key="index" expand-icon="keyboard_arrow_down">
				<v-layout slot="header" align-center>
					<v-icon class='mr-3'>{{section.icon}}</v-icon>
					<span class='subheading dark--text'>{{section.title}}</span>
				</v-layout>
				<v-card>
					<v-card-text>

						<!-- CHANGE EMAIL -->
						<div v-if='section.name == "email"'>
							<v-layout align-start column fill-height>
									<v-layout v-if='user.email' class="grey--text">
										<v-card class="grey--text">
											<v-card-text class='subheading black--text'>{{$t('profile.settings.active_email')}}: <span style="color: #546E7A" class='ml-1 subheading'>{{settingsUser.email}}</span></v-card-text>
										</v-card>
									</v-layout>
									<!-- show only if have pending email -->
									<v-layout class="grey--text" v-if='settingsUser.pendingEmail != null'>
										<v-card class="grey--text">
											<v-card-text class='subheading black--text'>
												{{$t('profile.settings.email_pending')}}
												<span class='ml-1 subheading' style="color: #546E7A">{{ settingsUser.pendingEmail }}</span>
												<v-btn @click='cancelPendingEmail' color="red ligten-1" dark style="outline: none;" flat>{{ $t('button.cancel') }}</v-btn>
											</v-card-text>
										</v-card>
									</v-layout>
							</v-layout>
							<form>
							<v-text-field
								v-if='user.email'
								@keyup.native='validateEmail("newEmail")'
								name='newEmail'
								v-model='newEmail'
								:label="$t('registration.email')"
								class='ml-3'
								color="grey darken-1"
								v-validate="'email'"
								:error-messages='arrayOfNewEmailErrors'>
							</v-text-field>
							<v-text-field
								v-if='user.email'
								name='passwordForNewEmail'
								@keyup.native='validatePassword'
								v-model='passwordForNewEmail'
								:error-messages='arrayOfPasswordForNewEmailErrors'
								color="grey darken-1"
								class='ml-3'
								:label="$t('registration.password')"
								@click:append="showPassword = !showPassword"
								:type="showPassword ? 'text' : 'password'"
								:append-icon="showPassword ? 'visibility_off' : 'visibility'"
								v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}">
							</v-text-field>
							</form>
							<v-btn v-if='user.email' @click='changeEmail("newEmail")' color="blue-grey lighten-1"	dark style="outline: none;" class="ml-3">{{ $t('button.save') }}</v-btn>
							<v-btn v-if='user.email' @click='clearNewEmail' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('button.reset') }}</v-btn>
						</div>

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
								<v-btn @click='onChangeNames' color="blue-grey lighten-1"	dark style="outline: none;" class="ml-3">{{ $t('button.save') }}</v-btn>
								<v-btn @click='clearNameFields' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('button.reset') }}</v-btn>
						</form>

						<!-- CHANGE PASSWORD -->
						<div v-if='section.name == "password"'>
							<form>
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
							</form>
							<form>
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
							</form>
							<v-btn @click='changePassword' color="blue-grey lighten-1"	dark style="outline: none;" class="ml-3">{{ $t('button.save') }}</v-btn>
							<v-btn @click='clearFields(section.name)' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('button.reset') }}</v-btn>
						</div>


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
							<div class='subheading black--text ml-3 mt-3'>{{$t('profile.settings.click')}}</div>
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
							<v-btn @click='onSaveNewImage' color="blue-grey lighten-1"	dark style="outline: none;" class="ml-3">{{ $t('button.save') }}</v-btn>
							<v-btn @click='resetImage' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('button.reset') }}</v-btn>
						</form>

						<!-- ADD MEDIA -->

						<v-layout v-if='section.name == "media"' class="grey--text">
							<v-card v-if='user.intra || user.github' class="grey--text"><v-card-text class='subheading black--text'> {{ $t('profile.settings.added_media') }}:</v-card-text></v-card>

									<v-card v-if='user.intra' class="grey--text">
										<v-card-text class='subheading'> 42 INTRA </v-card-text>
									</v-card>
									<v-card v-if='user.github' class="grey--text">
										<v-card-text class='subheading'> GITHUB </v-card-text>
									</v-card>

						</v-layout>

						<v-btn @click='addIntraMedia' v-if='section.name == "media" && !settingsUser.intra' color="blue-grey lighten-1"	dark style="outline: none;">42 Intra</v-btn>
						<v-btn @click='addGitMedia' v-if='section.name == "media" && !settingsUser.github' color="blue-grey lighten-1"	dark style="outline: none;">github</v-btn>


						<!-- ADD PASSWORD -->
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
							<v-btn @click='onSaveAddNewPassword' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('button.save') }}</v-btn>
							<v-btn @click='resetAddNewPassword' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('button.reset') }}</v-btn>
						</form>

						<!-- ADD EMAIL -->

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
							<v-btn @click='changeEmail("addEmail")' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('button.save') }}</v-btn>
							<v-btn @click='clearAddEmailSection' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('button.reset') }}</v-btn>
						</form>

						<!-- DELETE -->
						<v-btn v-if='section.name == "delete"' @click='deleteAccount' color="red lighten-1"	dark style="outline: none;">{{ $t('profile.settings.delete_account_title') }}</v-btn>

						<!-- CHANGE LANGUAGE -->
						<v-btn v-if='section.name == "lang"' @click='showLangRadio = true' color="blue-grey lighten-1"	dark style="outline: none;">{{ $t('profile.settings.change_language') }}</v-btn>

					</v-card-text>
				</v-card>
    		</v-expansion-panel-content>
  		</v-expansion-panel>
	</v-container>
	<NotFound v-else />
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
import NotFound from './NotFound'

export default {
	name: 'UserSettings',
	props: ['locale', 'user', 'userLoggedIn'],
	components: { Loader, Snackbar, ModalWindow, NotFound },
	data () {
		return {
			runLoader: false,
			showPassword: false,
			settingsUser: this.user,
			settingsLocale: this.locale,
			originalImg: this.user.image,
			imgToShow: this.user.image,
			sections: this.getSections(),
			showLangRadio: false,
			imgURL: '',
			newEmail: '',
			addEmail: '',
			password: '',
			newPassword: '',
			repeatNewPassword: '',
			addNewPassword: '',
			newFirstName: '',
			newLastName: '',
			passwordForNewEmail: '',
			arrayOfPasswordForNewEmailErrors: [],
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
			snackbarTimeout: 2500
		}
	},

	methods: {

		changeLanguage() {
			this.showLangRadio = false
			this.settingsLocale = this.settingsLocale
            this.$i18n.locale = this.settingsLocale
            localStorage.locale = this.settingsLocale
            this.$emit('setLocale', this.settingsLocale)
            if (localStorage.token != '') {
				HTTP.put('user/change/locale', { 'locale': this.settingsLocale }).then(result => {
					if (result.data.success == false) {
						setAuthorizationToken(false)
						this.$router.push('/')
					} else {
						this.showSnackbar = true
						this.snackbarText = this.$t('profile.success_alert')
					}
				}).catch((err) => {
					console.log("server error")
					console.log(err.response.data.error.message)
				})
            }
		},

		addIntraMedia() {
			this.runLoader = true
			window.location.href = 'https://api.intra.42.fr/oauth/authorize?client_id=5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7&redirect_uri=http://localhost:8084/intra&response_type=code'
		},

		addGitMedia() {
			this.runLoader = true
			window.location.href = 'https://github.com/login/oauth/authorize?client_id=1dfde4107005f390f4ff'
		},

		getSections(password, email, pendingEmail) {
			const sections = [
				{ title: this.$t('profile.settings.change_email'), icon: 'email', name: 'email'},
				{ title: this.$t('profile.settings.change_password'), icon: 'lock', name: 'password'},
				{ title: this.$t('profile.settings.change_info'), icon: 'person', name: 'names'},
				{ title: this.$t('profile.settings.change_picture'), icon: 'perm_media', name: 'picture'},
				{ title: this.$t('profile.settings.add_media'), icon: 'person_add', name: 'media'},
				{ title: this.$t('profile.settings.create_pass'), icon: 'fingerprint', name: 'addPass'},
				{ title: this.$t('profile.settings.create_email'), icon: 'alternate_email', name: 'addEmail'},
				{ title: this.$t('profile.settings.delete_account_title'), icon: 'delete', name: 'delete'},
				{ title: this.$t('button.language'), icon: 'language', name: 'lang'}
			]

			// I hate my life ...
			// Please, don't. This messy project will be over soon. -K
			if (password && email) {
				sections.splice(5, 1)
				sections.splice(5, 1)
			} else if (email || pendingEmail) {
				sections.splice(6, 1)
			}

			if (password) {
				if (sections[5].name !== 'delete')
					sections.splice(5, 1)
			}

			// I can't believe how much I hate ...
			if (!password && !email && !pendingEmail) {
				sections.splice(0, 1)
				sections.splice(0, 1)
			} else if (!email && !pendingEmail) {
				sections.splice(0, 1)
			} else if (!password) {
				sections.splice(1, 1)
			}
			return sections
		},

		validatePassword(e) {
			const fieldName = e.target.attributes.name.nodeValue
			if (fieldName === 'password') {
				this.arrayOfPasswordErrors = this.errors.has('password') ? this.password.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')] : []
			} else if (fieldName === 'newPassword') {
				this.arrayOfNewPasswordErrors = this.errors.has('newPassword') ? this.newPassword.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')] : []
			} else if (fieldName === 'repeatNewPassword') {
				this.arrayOfRepeatPasswordErrors = this.errors.has('repeatNewPassword') ? this.repeatNewPassword.length ? [this.$t('validation.repeatPassword')] : [this.$t('validation.required')] : []
			} else if (fieldName === 'addNewPassword') {
				this.arrayOfAddNewPasswordErrors = this.errors.has('addNewPassword') ? this.addNewPassword.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')] : []
			} else if (fieldName === 'passwordForNewEmail') {
				this.arrayOfPasswordForNewEmailErrors =  this.errors.has('passwordForNewEmail') ? this.passwordForNewEmail.length ? [this.$t('validation.wrongFormat')] : [this.$t('validation.required')] : []
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
			this.runLoader = true
			HTTP.delete('user/delete/self').then((response) => {
				setAuthorizationToken(false)
				this.$router.push('/')
				this.runLoader = false
				this.$emit('updateUser', false)
			}).catch((error) => {
				this.runLoader = false
				this.showSnackbar = true
				this.snackbarText = this.$t('activation.error_alert')
			})
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
						this.$emit('updateUser', {password: true})
						this.sections = this.getSections(true, this.settingsUser.email, this.settingsUser.pendingEmail)
						this.resetAddNewPassword()
					} else {
						if (response.data.message === 'Invalid password') {
							this.arrayOfAddNewPasswordErrors =  [this.$t('validation.invalidPassword')]
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
				if (!this.arrayOfNewEmailErrors.length && this.newEmail.length && !this.arrayOfPasswordForNewEmailErrors.length && this.passwordForNewEmail.length) {
					this.runLoader = true
					HTTP.put('user/change/email', { email: this.newEmail, password: this.passwordForNewEmail }).then((response) => {
						if (response.data.success) {
							this.$emit('updateUser', { pendingEmail: this.newEmail })
							this.showSnackbar = true
							this.snackbarText = this.$t('registration.success_alert')
							this.clearNewEmail()
						} else {
							if (response.data.message === 'Invalid token') {
								setAuthorizationToken(false)
								this.$router.push('/')
							} else if (response.data.message === 'Invalid email') {
								this.arrayOfNewEmailErrors = [this.$t('validation.email')]
							} else if (response.data.message === 'Invalid password') {
								this.arrayOfPasswordForNewEmailErrors = [this.$t('validation.invalidPassword')]
							} else {
								this.arrayOfNewEmailErrors = [this.$t('login.error_alert')]
								this.arrayOfPasswordForNewEmailErrors = [this.$t('login.error_alert')]
							}
						}
						this.runLoader = false
					}).catch((error) => {
						this.showSnackbar = true
						this.snackbarText = this.$t('login.error_alert')
						this.runLoader = false
					})
				}
			} else if (section === 'addEmail') {
				if (!this.arrayOfAddEmailErrors.length && this.addEmail.length) {
					this.runLoader = true
					HTTP.post('user/add/email', { email: this.addEmail }).then((response) => {
						console.log('response =>', response)
						if (response.data.success) {
							this.showSnackbar = true
							this.snackbarText = this.$t('registration.success_alert')
							this.sections = this.getSections(this.settingsUser.password, false, true)
							this.$emit('updateUser', { pendingEmail: this.addEmail })
							this.clearAddEmailSection()
						} else {
							if (response.data.message === 'Invalid token') {
								setAuthorizationToken(false)
								this.$router.push('/')
							} else if (response.data.message === 'Invalid email') {
								this.arrayOfAddEmailErrors = [this.$t('validation.email')]
							} else {
								this.arrayOfAddEmailErrors = [this.$t('login.error_alert')]
							}
						}
						this.runLoader = false
					}).catch((error) => {
						console.log('errors', error)
						this.showSnackbar = true
						this.snackbarText = this.$t('login.error_alert')
						this.runLoader = false
					})
				}
			}

		},

		cancelPendingEmail() {
			this.runLoader = true
			HTTP.delete('user/delete/pending-email').then((response) => {
				if (!response.data.success) {
					if (response.data.message === 'Invalid token') {
						setAuthorizationToken(false)
						this.$router.push('/')
					} else {
						this.showSnackbar = true
						this.snackbarText = this.$t('login.error_alert')
					}
				} else {
					this.sections = this.getSections(this.settingsUser.password, this.settingsUser.email, false)
					this.$emit('updateUser', { pendingEmail: null })
				}
				this.runLoader = false
			}).catch((error) => {
				this.showSnackbar = true
				this.snackbarText = this.$t('login.error_alert')
				this.runLoader = false
			})
		},

		clearNewEmail() {
			console.log('this.user ->', this.user)
			this.newEmail = ''
			this.passwordForNewEmail = ''
			this.arrayOfNewEmailErrors = []
			this.arrayOfPasswordForNewEmailErrors = []
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

		validateEmail(section) {
			if (section === 'newEmail') {
				if (this.errors.has('newEmail')) {
					this.arrayOfNewEmailErrors = [this.$t('validation.email')]
				} else if (this.newEmail.length) {
					HTTP.get(`user/check-email/` + this.newEmail)
					.then(response => { this.arrayOfNewEmailErrors = response.data.exist == true ? [this.$t('validation.serverError')] : [] })
					.catch((err) => { this.arrayOfNewEmailErrors = [this.$t('registration.error_alert')] })
				}
			} else if (section === 'addEmail') {
				if (this.errors.has('addEmail')) {
					this.arrayOfAddEmailErrors = [this.$t('validation.email')]
				} else if (this.addEmail.length) {
					HTTP.get(`user/check-email/` + this.addEmail)
					.then(response => { this.arrayOfAddEmailErrors = response.data.exist == true ? [this.$t('validation.serverError')] : []})
					.catch((err) => { this.arrayOfAddEmailErrors = [this.$t('registration.error_alert')] })
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

	created() {
			HTTP.get('user/data/').then(result => {
				if (result.data.success == false) {
					setAuthorizationToken(false)
					this.$router.push('/')
				} else {
					this.$emit('userLoggedIn', true)
					this.$emit('setUser', result.data)
				}
			}).catch((err) => { setAuthorizationToken(false);})
	},


	computed: {
		closeSnackbar() { this.showSnackbar = false }
	},

	watch: {
		locale () { this.sections = this.getSections(this.user.password, this.user.email, this.user.pendingEmail) },
		user() {
			this.sections = this.getSections(this.user.password, this.user.email, this.user.pendingEmail)
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
