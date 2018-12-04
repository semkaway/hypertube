<template>
    <v-toolbar color="grey darken-3" dark fixed height='68'>
        <v-toolbar-items>
            <v-btn flat  @click='goToHomePage'> <v-icon>home</v-icon> <span class='ml-2'>{{ $t('button.home') }}</span> </v-btn>
            <v-btn v-if='userLoggedIn === false' flat @click="toggleForm"> <v-icon>exit_to_app</v-icon> <span class='ml-2'>{{ $t('button.login') }}</span> </v-btn>
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
        <v-toolbar-items v-if='userLoggedIn === true'>
            <v-menu color="grey darken-3" dark bottom origin="center center" transition="scale-transition">
            <v-btn flat slot="activator">
                <v-img class='rounded round-img' :aspect-ratio="16/9" height='40px' width='40px' src="https://scontent.fiev11-1.fna.fbcdn.net/v/t31.0-8/12238251_122765231421877_3608124406558435231_o.jpg?_nc_cat=101&_nc_ht=scontent.fiev11-1.fna&oh=147ba3f1ae17bd4c100214a636a7fddc&oe=5C9BF3BB" alt="User photo"></v-img>
                <span class='ml-2 header-name'>{{ 'KSENIA' | capitalizeFirstLetter }}</span>
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
        props: ['user', 'token', 'locale'],
        data: () => ({
        headerLocale: this.locale,
        headerToken: this.token,
        headerUser: this.user,
        showForm: false,
        userLoggedIn: false,
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
                this.userLoggedIn = false
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
					setAuthorizationToken(false)
					this.$router.push('/')
				} else {
                    this.$emit('setUser', result.data)
                    this.userLoggedIn = true
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
            this.userLoggedIn = true
            this.$emit('setTokenAndLocale', response)
        },

        userLoggedOut() {
             this.userLoggedIn = false
        },

        goToHomePage() {
            this.$router.push('/movies')
        }

    },

    created () {
        this.fetchData()
        this.requestUser()
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
            this.$i18n.locale = this.locale;
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