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
						<form v-if='section.name == "password"'>

							<v-text-field 
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
								:label="$t('profile.settings.new_password_repeat')"
								@keyup.native='validatePassword'
								:error-messages="arrayOfRepeatPasswordErrors" 
								v-model="repeatNewPassword"
								:type="showPassword ? 'text' : 'password'" 
								color="grey darken-1"
								name='repeatNewPassword'
								v-validate="'required|confirmed:newPasswordRef'">
							</v-text-field>

							<v-btn @click='changePassword' large color="grey" class="white--text" flat>{{ $t('button.save') }}</v-btn>
							<v-btn @click='clearFields(section.name)' large color="grey" class="white--text" flat>{{ $t('button.reset') }}</v-btn>
						</form>

						<v-btn v-if='section.name == "delete"' @click='deleteAccount' large color="red" class="white--text" flat>{{ $t('profile.settings.delete_account_title') }}</v-btn>

					</v-card-text>
				</v-card>
    		</v-expansion-panel-content>
  		</v-expansion-panel>
	</v-container>
</template>



<script>





// <template>
//   <div>
//     <b-row>
// 			<b-col sm="3" lg="4"></b-col>
// 			<b-col sm="5" lg="4">
// 				<b-alert 	variant="success"
// 									dismissible
// 									:show="showSuccessAlert"
//                   @dismissed="showSuccessAlert=false"
// 									class="mt-3">{{$t('profile.success_alert')}}
// 				</b-alert>
//         <b-alert 	variant="success"
// 									dismissible
// 									:show="showSuccessPassAlert"
//                   @dismissed="showSuccessPassAlert=false"
// 									class="mt-3">{{$t('forgot_password.restore_pass_success_title')}} {{$t('forgot_password.restore_pass_success_alert')}}
// 				</b-alert>
// 				<b-alert 	variant="danger"
// 									dismissible
// 									:show="showErrorPassAlert"
//                   @dismissed="showErrorPassAlert=false"
// 									class="mt-3">{{$t('profile.error_pass_alert')}}
// 				</b-alert>
//         <b-alert 	variant="danger"
// 									dismissible
// 									:show="showErrorAlert"
//                   @dismissed="showErrorAlert=false"
// 									class="mt-3">{{$t('login.error_alert')}}
// 				</b-alert>
//         <b-alert 	variant="success"
// 									dismissible
// 									:show="showEmailSentSuccess"
// 									@dismissed="showEmailSentSuccess=false"
// 									class="mt-3">{{$t('registration.success_alert')}}
// 				</b-alert>
// 			</b-col>
// 			<b-col sm="3" lg="4"></b-col>
// 		</b-row>
//     <b-row >
//       <b-col sm="3" lg="3" >
//         <div class="text-left mt-5 ml-5 d-none d-lg-block" id="scrollspy">
//           <h3 href="#">{{ $t('profile.settings_title') }}</h3>
//           <b-list-group>
//             <b-list-group-item class="hover-items" href="#password" :class="{'normalHide': normalHide}">{{ $t('profile.settings.change_password') }}</b-list-group-item>
//             <b-list-group-item class="hover-items" href="#email" :class="{'normalHide': !createEmailHide}">{{ $t('profile.settings.change_email') }}</b-list-group-item>
//             <b-list-group-item class="hover-items" href="#create-email" :class="{'omniauthHide': createEmailHide}">{{ $t('profile.settings.create_email') }}</b-list-group-item>
//             <b-list-group-item class="hover-items" href="#create-pass" :class="{'omniauthHide': passwordHide}">{{ $t('profile.settings.create_pass') }}</b-list-group-item>
//             <b-list-group-item class="hover-items" href="#personal">{{ $t('profile.settings.change_info') }}</b-list-group-item>
//             <b-list-group-item class="hover-items" href="#picture">{{ $t('profile.settings.change_picture') }}</b-list-group-item>
//             <b-list-group-item class="hover-items" href="#social-media" :class="{'socialHide': socialHide}">{{ $t('profile.settings.add_media') }}</b-list-group-item>
//             <b-list-group-item class="hover-items" href="#delete-account">{{ $t('profile.settings.delete_account_title') }}</b-list-group-item>
//           </b-list-group>
//         </div>
//       </b-col>
//       <b-col sm="5" lg="5" class="mt-4 mb-4" >
//         <!-- <div :class="{'normalHide': normalHide}"> -->
//           <b-form @submit="onSubmitPass" class="mt-4 p-3" id="password" :class="{'normalHide': normalHide}">
//             <h1 class="text-left mb-3">{{ $t('profile.settings.change_password') }}</h1>
//             <b-form-group :label="$t('profile.settings.old_password')"
//   												:error="errors.first('password')"
//   												class="font-weight-bold">
//   						<b-form-input name="old_password"
//   													type="password"
//   													v-model="settings.old_password"
//   													v-bind:placeholder="$t('profile.settings.old_password')"
//   													data-vv-as=" "
//   													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
//   													:class="{'form-control': true, 'error': errors.has('old_password') }">
//   						</b-form-input>
//               <span>{{ errors.first('old_password') }}</span>
//             </b-form-group>
//   					<b-form-group :label="$t('profile.settings.new_password')"
//   												:error="errors.first('password')"
//   												:description="$t('registration.password_hint')"
//   												class="font-weight-bold">
//   						<b-form-input name="new_password"
//   													ref="passwordRef"
//   													type="password"
//   													v-model="settings.new_password"
//   													v-bind:placeholder="$t('profile.settings.new_password')"
//   													data-vv-as=" "
//   													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
//   													:class="{'form-control': true, 'error': errors.has('new_password') }">
//   						</b-form-input>
//   						<span>{{ errors.first('new_password') }}</span>
//   					</b-form-group>
//             <b-form-group :label="$t('profile.settings.new_password_repeat')"
//   												class="font-weight-bold">
//   							<b-form-input name="new_password_repeat"
//   												type="password"
//   												v-model="settings.new_password_repeat"
//   												v-bind:placeholder="$t('profile.settings.new_password_repeat')"
//   												data-vv-as=" "
//   												v-validate="'required|confirmed:passwordRef'"
//   												:class="{'form-control': true, 'error': errors.has('new_password_repeat') }">
//   							</b-form-input>
//   							<span>{{ errors.first('new_password_repeat') }}</span>
//   					</b-form-group>
//             <b-button type="submit" variant="outline-success" class="mt-2 t">{{$t('button.save')}}</b-button>
//             <hr>
//           </b-form>
//           <b-form @submit="onSubmitEmail" class="mt-4 p-3" id="email">
//             <h1 class="text-left mb-3" :class="{'normalHide': !createEmailHide}">{{ $t('profile.settings.change_email') }} </h1>
//             <h1 class="text-left mb-3" :class="{'createEmailHide': createEmailHide}">{{ $t('profile.settings.create_email') }}</h1>
//             <b-form-group :label="$t('registration.email')"
//   												class="font-weight-bold">
//   							<b-form-input name="email"
//   												v-model="settings.email"
//   												v-bind:placeholder="$t('registration.email')"
//   												data-vv-as=" "
//                           :value="user.email"
//   												v-validate="'required|email'"
//   												:class="{'form-control': true, 'error': errors.has('email'), 'email-error': emailError }"
//   												@keyup.native="checkIfEmailExists(settings.email)">
//   							</b-form-input>
//   							<span>{{ errors.first('email') }}</span>
//   							<span :class="{ 'hideEmailExists': hideEmailExists }">{{$t('registration.emailExists')}}</span>
//               </b-form-group>
//               <b-form-group :label="$t('login.password')"
//     												class="font-weight-bold"
//                             :class="{'createEmailHide': !createEmailHide}">
//     						<b-form-input name="email_password"
//     													type="password"
//     													v-model="settings.email_password"
//     													v-bind:placeholder="$t('login.password')"
//     													data-vv-as=" "
//     													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
//     													:class="{'form-control': true, 'error': errors.has('email_password')}">
//     						</b-form-input>
//                 <span>{{ errors.first('email_password') }}</span>
//               </b-form-group>
//               <span class="text-muted" :class="{'newEmailSpan': newEmailSpan}">{{ $t('profile.settings.email_pending') }}</span>
//               <span class="text-info" :class="{'newEmailSpan': newEmailSpan}">{{user.pendingEmail}}</span>
//               <span class="text-danger" :class="{'newEmailSpan': newEmailSpan}" @click="deleteEmail">{{$t('button.delete')}}</span><br>
//               <b-button type="submit" variant="outline-success" class="mt-2">{{$t('button.save')}}</b-button>
//               <hr>
//           </b-form>
//           <b-form @submit="onSubmitCreatePass" class="mt-4 p-3" id="create-pass" :class="{'passwordHide': passwordHide}">
//             <h1 class="text-left mb-3">{{ $t('profile.settings.create_pass') }}</h1>
//             <b-form-group :label="$t('registration.password')"
//   												:error="errors.first('create_password')"
//   												:description="$t('registration.password_hint')"
//   												class="font-weight-bold">
//   						<b-form-input name="create_password"
//   													ref="password_create"
//   													type="password"
//   													v-model="create.password"
//   													v-bind:placeholder="$t('registration.password')"
//   													data-vv-as=" "
//   													v-validate="{required: true, min: 8, max: 20, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}"
//   													:class="{'form-control': true, 'error': errors.has('create_password') }">
//   						</b-form-input>
//   						<span>{{ errors.first('create_password') }}</span>
//   					</b-form-group>
//             <b-form-group :label="$t('registration.repeat_password')"
//   												class="font-weight-bold">
//   							<b-form-input name="create_password_repeat"
//   												type="password"
//   												v-model="create.password_repeat"
//   												v-bind:placeholder="$t('registration.repeat_password')"
//   												data-vv-as=" "
//   												v-validate="'required|confirmed:password_create'"
//   												:class="{'form-control': true, 'error': errors.has('create_password_repeat') }">
//   							</b-form-input>
//   							<span>{{ errors.first('create_password_repeat') }}</span>
//   					</b-form-group>
//             <b-button type="submit" variant="outline-success" class="mt-2">{{$t('button.save')}}</b-button>
//             <hr>
//         </b-form>
//         <b-form @submit="onSubmitPersonal" class="mt-4 p-3" id="personal">
//           <h1 class="text-left mb-3">{{ $t('profile.settings.change_info') }}</h1>
//           <b-form-group :label="$t('registration.first_name')"
// 												class="font-weight-bold">
// 							<b-form-input name="first_name"
// 												v-model="settings.first_name"
// 												v-bind:placeholder="$t('registration.first_name')"
// 												data-vv-as=" "
//                         :value="user.first_name"
// 												v-validate="'alpha|min:3|max:15'"
// 												:class="{'form-control': true, 'error': errors.has('first_name') }">
// 							</b-form-input>
// 							<span>{{ errors.first('first_name') }}</span>
// 					</b-form-group>
// 					<b-form-group :label="$t('registration.last_name')"
// 												class="font-weight-bold">
// 							<b-form-input name="last_name"
// 												v-model="settings.last_name"
// 												v-bind:placeholder="$t('registration.last_name')"
// 												data-vv-as=" "
//                         :value="user.last_name"
// 												v-validate="'alpha|min:3|max:15'"
// 												:class="{'form-control': true, 'error': errors.has('last_name') }">
// 							</b-form-input>
// 							<span>{{ errors.first('last_name') }}</span>
// 					</b-form-group>
//           <b-button type="submit" variant="outline-success" class="mt-2">{{$t('button.save')}}</b-button>
//         </b-form>
//         <hr>
//         <div id="picture" class="mt-4 p-3">
//           <h1 class="text-left mb-3">{{ $t('profile.settings.change_picture') }}</h1>
//           <p>{{$t('profile.settings.enter_url')}}</p>
//           <b-form-input
//                   type="text"
//                   name="img_url"
//                   v-model="img_url"
//                   placeholder='https://images.pexels.com/photos/1616227/pexels-photo-1616227.jpeg'
//                   data-vv-as=" "
//                   v-validate="'url:require_protocol'"
//                   @change="onFileSelected"></b-form-input><br>
//           <span>{{ errors.first('img_url') }}</span>
//           <p>{{$t('profile.settings.click')}}</p>
//           <label class="file-select">
//             <img :src="user.image" height="200" alt="Image preview..."><br>
//             <input type="file" @change="onFileSelected"/><br>
//           </label><br>
//           <b-button variant="success" @click="Upload" :class="{'hideButton': hideButton}">Change picture</b-button>
//         </div>
//         <hr>
//         <div id="social-media" class="mt-4 p-3" :class="{'socialHide': socialHide}">
//           <h1 class="text-left mb-3">{{ $t('profile.settings.add_media') }}</h1>
//           <b-btn class="mt-3 button" :class="{'intra': intra}" variant="dark" href='https://api.intra.42.fr/oauth/authorize?client_id=5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7&redirect_uri=http://localhost:8084/intra&response_type=code'>42 Intra</b-btn>
//           <b-btn class="mt-3 button" :class="{'github': github}" variant="dark" href='https://github.com/login/oauth/authorize?client_id=1dfde4107005f390f4ff'>Github</b-btn>
//           <hr>
//         </div>
//         <div class="mt-4 p-3" id="delete-account">
//           <h1 class="text-left mb-3">{{ $t('profile.settings.delete_account_title') }}</h1>
//           <b-button variant="danger" size="lg" @click="showModal" class="mt-2">{{$t('button.delete')}}</b-button>
//           <b-modal  ref="deleteAccount"
//                     centered
//                     hide-footer
//                     :title="$t('profile.settings.delete_account_title')"
//                     :header-bg-variant="headerBgVariant"
//                     :header-text-variant="headerTextVariant">
//             <p class="my-4">{{ $t('profile.settings.delete_account_text') }}</p>
//             <b-btn class="mt-3" variant="outline-danger" @click="deleteAccount">{{$t('button.delete')}}</b-btn>
//             <b-btn class="mt-3" variant="outline-secondary" @click="hideModal">{{$t('button.cancel')}}</b-btn>
//           </b-modal>
//         </div>
//       </b-col>

//       <b-col sm="3" lg="4"></b-col>
//     </b-row>
//   </div>
// </template>

const reader  = new FileReader()
import { HTTP } from '../http-common'
import Loader from './Loader'
import Snackbar from './Snackbar'
import ModalWindow from './ModalWindow'
import imageCompression from 'browser-image-compression'


export default {
	name: 'UserSettings',
	props: ['locale'],
	components: { Loader, Snackbar, ModalWindow },
	data () {
		return {
			runLoader: false,
			showPassword: false,
			locale1: this.locale,
			sections: this.getSections(),
			password: '',
			newPassword: '',
			repeatNewPassword: '',
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
					// show snackbar with server error
				})
			}
		},

		deleteAccount() { this.showModal = true},
		onDisagree() { this.showModal = false },
		onAgree() {
			this.showModal = false
			// send to the server delete account action 
		},

	

	},

	computed: {
			closeSnackbar() {
				this.showSnackbar = false
			}
		},

	watch: {
		locale () { this.sections = this.getSections() }
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