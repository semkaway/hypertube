<template>
    <v-toolbar color="grey darken-3" dark fixed height='68'>
        <v-toolbar-items>
            <v-btn flat  @click='goToHomePage'> <v-icon>home</v-icon> <span class='ml-2'>{{ $t('button.home') }}</span> </v-btn>
            <v-btn v-if='userLoggedIn === false' flat @click="toggleForm"> <v-icon>exit_to_app</v-icon> <span class='ml-2'>{{ $t('button.login') }}</span> </v-btn>
        </v-toolbar-items>
        <LogInForm v-if='showForm == true' v-bind:showForm='showForm' v-on:toggleForm='toggleForm' v-on:setUser='setUser' v-bind:locale='headerLocale'/>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if='userLoggedIn === true'>
            <v-menu color="grey darken-3" dark bottom origin="center center" transition="scale-transition">
            <v-btn flat slot="activator">
                <v-img class='rounded round-img' :aspect-ratio="16/9" height='40px' width='40px' :src="headerUser.image" alt="User photo"></v-img>
                <span class='ml-2 header-name'>{{ headerUser.first | capitalizeFirstLetter }}</span>
            </v-btn>
            <v-list>
                <v-list-tile @click="menuClick('profile')">
                    <v-icon class='mr-2'>account_circle</v-icon>
                    <v-list-tile-title>
                        {{ $t('profile.profile_title') }}
                    </v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="menuClick('settings')">
                    <v-icon class='mr-2'>settings</v-icon>
                    <v-list-tile-title>
                        {{ $t('profile.settings_title') }}
                    </v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="menuClick('logout')">
                    <v-icon class='mr-2'>exit_to_app</v-icon>
                    <v-list-tile-title>
                        {{ $t('button.logout') }}
                    </v-list-tile-title>
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
    import setAuthorizationToken from '../../utils/setAuthToken'

    export default {
        name: 'TopHeader',
        components: { LogInForm },
        props: ['user', 'token', 'locale', 'userLoggedIn'],
        data: () => ({
        headerLocale: this.locale,
        headerToken: this.token,
        headerUser: this.user,
        showForm: false,
        headerUserLoggedIn: this.userLoggedIn,
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
          menuClick(target) {
            if (target === 'logout') {
                setAuthorizationToken(false)
                this.$router.push('/')
                // this.userLoggedIn = false
                this.$emit('setUserStatus', false)
            } else if (target === 'settings') {
                this.$router.push('/user/settings')
            } else if (target === 'profile') {
                this.$router.push('/user')
            }
        },

        changeLanguage (locale) {
            this.headerLocale = locale
            this.$i18n.locale = locale
            localStorage.locale = locale
            this.$emit('setLocale', locale)
            if (localStorage.token != '') {
            HTTP.put('user/change/locale', {
                'token': localStorage.token,
                'locale': locale
            }).then(result => {
                if (result.data.success == false) {
                    setAuthorizationToken(false)
                    this.$router.push('/')
                }
            }).catch((err) => {
                console.log("server error")
                console.log(err.response.data.error.message)
            })
            }
        },

        requestUser () {
            HTTP.get('user/data/').then(result => {
                if (result.data.success == false) {
                    // this.userLoggedIn = false
                    this.$emit('setUserStatus', false)
                    setAuthorizationToken(false)
                    this.$router.push('/')
                } else {
                    this.$emit('setUser', result.data)
                    // this.userLoggedIn = true
                    this.$emit('setUserStatus', true)
                }
		    }).catch((err) => { setAuthorizationToken(false); this.$router.push('/')})
		},

        fetchData () {
            this.headerLocale = localStorage.locale
            if (this.headerLocale) {
                this.$i18n.locale = this.headerLocale
            }
        },

        toggleForm() {
            this.showForm = !this.showForm
        },

        setUser(response) {
            // this.userLoggedIn = true
               this.$emit('setUserStatus', true)
            this.requestUser()
            this.$emit('setTokenAndLocale', response)
        },

        userLoggedOut() {
               this.$emit('setUserStatus', false)
            //  this.userLoggedIn = false
        },

        goToHomePage() {
            this.$router.push('/movies')
        }

    },

    created () {
        this.fetchData()
        if (this.token) {
            this.requestUser() 
        }
    },

    mounted() {
        this.headerUser = this.user
        this.headerToken = this.token
        this.headerLocale = this.locale
    },
    
    filters: {
        capitalize (value) {
            if (!value) return ''
            return value.toString().toUpperCase()
        },

        capitalizeFirstLetter (value) {
            if (!value) return ''
            let str = value.toString()
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        }
    },
    
    watch:
    {
        user () {
            this.headerUser = this.user
        },

        locale () {
            this.$i18n.locale = this.locale
        },

        token () {
            this.headerToken = this.token
        },

        userLoggedIn () {
            console.log('update user logged in')
            this.headerUserLoggedIn = this.userLoggedIn
        },

        '$route': 'fetchData',
    }
}
</script>

<style>

.round-img {
    border-radius: 50px !important;
}

.header-name {
    text-transform: none !important;
}

</style>