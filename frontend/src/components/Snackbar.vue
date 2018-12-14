<template>
    <v-snackbar color="blue-grey darken-2" v-model="active" :bottom="y === 'bottom'" :left="x === 'left'" :right="x === 'right'" :top="y === 'top'">
		{{text}}
    	<v-btn color="red" flat @click="closeSnackBar">{{$t('button.close')}}</v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: 'Snackbar',
        props: ['text', 'y', 'x', 'show', 'timeout'],
        data() {
            return {
                active: this.show
            }
        },

        methods: {
            closeSnackBar () {
                this.$emit('closeSnackbar')
            }
        },

        watch: {
            show (newValue) {
                this.active = newValue
                setTimeout(() => { this.$emit('closeSnackbar') }, this.timeout)
            }
        }
    }
</script>
