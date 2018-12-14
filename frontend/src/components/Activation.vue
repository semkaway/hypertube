<template></template>

<script>
import { HTTP } from '../http-common'

export default {
  name: 'Activation',

  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const myToken = urlParams.get('token');

    HTTP.post(`user/activate`, { "token": myToken}).then(response => {
			if (response.data.success == true) {
				this.$router.push('/')
				this.$emit('userActivate', 'activation.success_title')
			} else if (response.data.success == false && (response.data.message != "Invalid email" && response.data.message != "Invalid token")) {
				this.$router.push('/')
				this.$emit('userActivate', 'activation.error_alert')
			} else {
				this.$router.push('/')
				this.$emit('userActivate', 'activation.invalid_alert')
			}
		})
      	.catch((err) => {
			this.$router.push('/')
			this.$emit('userActivate', 'activation.error_alert')
      	})
    }
  }
</script>
