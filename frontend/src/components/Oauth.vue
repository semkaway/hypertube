<template>
  <div>

  </div>
</template>

<script>
import {HTTP} from '../http-common';
import setAuthorizationToken from '../utils/setAuthToken'

export default {
  name: 'UserPage',
  data () {
    return {

      }
    },
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const currUrl = window.location.pathname
      const myCode = urlParams.get('code');
      const accessDenied = urlParams.get('error');
      console.log("token: "+ localStorage.token)

      if(myCode == null && accessDenied == null) {
        console.log('invalid data')
        localStorage.token = ''
        this.$router.push('/')
      } else if (myCode != null && accessDenied == null) {
        console.log('not null')
        if (localStorage.token !== '') {
          // add user
		  // need TO DO IT !!!!
          HTTP.post(`user/add`+currUrl, { "code": myCode })
            .then(response => {
              // emit to app vue intra user
              if (response.data.success == true) {
                console.log('all good')
                this.$router.push('/user/settings')
              } else if (response.data.message == "Invalid token") {
                localStorage.token = ''
                this.$router.push('/')
              } else if (response.data.message == "User exist") {
                this.$router.push('/user/settings')
                console.log('this user already exists')
              }
            })
            .catch((err) => {
              console.log("server error")
              console.log(err.response.data.error.message)
              this.$router.push('/')
            })
        }
        else {
          // login
          HTTP.post(`user/oauth`+currUrl, { "code": myCode, "locale": this.$i18n.locale }).then(response => {
              if (response.data.success == true) {
                this.$i18n.locale = response.data.locale
                localStorage.locale = response.data.locale
                setAuthorizationToken(response.data.token)
                // set user
				 HTTP.get('user/data/').then(result => {
					if (result.data.success == false) {
						setAuthorizationToken(false)
						this.$router.push('/')
					} else {
						this.$emit('setTokenAndLocale', {token: response.data.token, locale: response.data.locale })
						this.$emit('updateUser', result.data)
					}
				}).catch((err) => { setAuthorizationToken(false); this.$router.push('/')})
              } else { this.$router.push('login?fail=true') }
            })
            .catch((err) => { setAuthorizationToken(false);  this.$router.push('/') })
        }
      } else if (myCode == null && accessDenied != null) {
        if (localStorage.token === '') {
          this.$router.push('login?fail=true')
        } else {
          this.$router.push('user/settings')
        }
      } else { setAuthorizationToken(false);  this.$router.push('/') }
    },
  }
</script>