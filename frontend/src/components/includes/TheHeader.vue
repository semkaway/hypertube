<template>
    <v-toolbar color="grey darken-3" dark fixed height='68'>
        <v-toolbar-items>
            <v-btn flat> <v-icon>home</v-icon> <span class='ml-2'>{{ $t('button.home') }}</span> </v-btn>
            <v-btn flat @click="toggleForm"> <v-icon> exit_to_app</v-icon> <span class='ml-2'>{{ $t('button.login') }}</span> </v-btn>
        </v-toolbar-items>
        <LogInForm v-if='showForm == true' v-bind:showForm='showForm' v-on:toggleForm='toggleForm' v-on:setUser='setUser'/>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-menu color="grey darken-3" dark bottom origin="center center" transition="scale-transition">
                <v-btn flat slot="activator">
                    <v-icon>language</v-icon>
                    <span class='ml-2'>{{ headerLocale }}</span>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="(item, i) in lang" :key="i" @click="changeLanguage(item.short)">
                    <v-list-tile-title>{{ item.short | capitalize }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import axios from 'axios'
    import LogInForm from '../LogInForm'
    import { HTTP } from '../../http-common'

    export default {
        name: 'TopHeader',
        components: { LogInForm },
        props: ['user', 'token', 'locale'],
        data: () => ({
        headerLocale: this.locale,
        headerToken: this.token,
        headerUser: this.user,
        showForm: false,
        lang: {
            en: {
                lang: 'English',
                short: "en"
            },
            ru: {
                lang: 'Русский',
                short: "ru"
            },
            uk: {
                lang: 'Українська',
                short: "uk"
            },
        }
    }),
    methods: {
        changeLanguage (locale) {
            this.headerLocale = locale
            this.$i18n.locale = locale
            localStorage.locale = locale
            if (localStorage.token != '') {
            HTTP.put('user/change/locale', {
                'token': localStorage.token,
                'locale': locale
            }).then(result => {
                if (result.data.success == false) {
                    localStorage.token = ''
                    this.$router.push('/')
                }
            }).catch((err) => {
                console.log(err.response.data.error.message)
                console.log("server error")
            })
            }
        },

        fetchData () {
            this.headerLocale = localStorage.locale
            if ( this.headerLocale) {
                this.$i18n.locale = this.headerLocale
            }
        },

        toggleForm() {
            this.showForm = !this.showForm
        },

        setUser(response) { 
            this.$emit('setTokenAndLocale', response)
        }
    },
    created () {
        this.fetchData()
    },
    filters: {
        capitalize (value) {
            if (!value) return ''
            return value.toString().toUpperCase()
        }
    },
    watch: {
            locale() {
                this.$i18n.locale = localStorage.locale;
            },
            '$route': 'fetchData'
        }
    }
</script>
