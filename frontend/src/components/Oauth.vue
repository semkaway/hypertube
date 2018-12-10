<template>
  	<div>
		<Loader :run='runLoader'/>
	</div>
</template>

<script>
import {HTTP} from '../http-common';
import setAuthorizationToken from '../utils/setAuthToken'
import Loader from './Loader'

export default {
  name: 'UserPage',
	 components: { Loader },
  data () {
    return { runLoader: false}
    },
    mounted() {
		const urlParams = new URLSearchParams(window.location.search)
		const currUrl = window.location.pathname
		const myCode = urlParams.get('code')
		const accessDenied = urlParams.get('error')
		
		this.runLoader = true
      	if (myCode == null && accessDenied == null) {
		    this.runLoader = false
          	setAuthorizationToken(false)
          	this.$router.push('/')
			console.log('all bad')
      	} else if (myCode != null && accessDenied == null) {
			if (localStorage.token !== '') { // add user
				HTTP.post(`user/add` + currUrl, { "code": myCode }).then(response => {
					if (response.data.success == true) {
						console.log('all good')
						this.$emit('userAdded')
						this.$router.push('/settings')
					} else if (response.data.message == "Invalid token") {
						setAuthorizationToken(false)
						this.$router.push('/')
					} else if (response.data.message == "User exist") {
						this.$router.push('/settings')
						this.$emit('userAlreadyExists')
					}
					this.runLoader = false
				})
				.catch((err) => {
					this.runLoader = false
					this.$router.push('/')
				})
        	} // login user
			else {
				HTTP.post(`user/oauth`+currUrl, { "code": myCode, "locale": this.$i18n.locale }).then(response => {
					if (response.data.success == true) {
						this.$i18n.locale = response.data.locale
						localStorage.locale = response.data.locale
						setAuthorizationToken(response.data.token)
						HTTP.get('user/data/').then(result => {
							if (result.data.success == false) {
								setAuthorizationToken(false)
								this.$router.push('/')
							} else {
								this.$emit('updateUser', result.data)
								this.$router.push('/movies')
							}
							this.runLoader = false
						}).catch((err) => { 
							setAuthorizationToken(false)	
							this.runLoader = false 
							this.$router.push('/')
						})
					} else { 	
						this.runLoader = false
						this.$router.push('login?fail=true') 
					}
				}).catch((err) => { 
					setAuthorizationToken(false); 
					this.runLoader = false; 
					this.$router.push('/')
				})
			}
		} else if (myCode == null && accessDenied != null) {
			if (localStorage.token === '') {
				this.$router.push('login?fail=true')
			} else {
				this.$router.push('/settings')
			}
			this.runLoader = false
      } else {
		  setAuthorizationToken(false)
		  this.runLoader = false
		  this.$router.push('/') 
		}
    },
  }
</script>