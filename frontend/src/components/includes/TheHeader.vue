<template>
    <v-toolbar color="grey darken-3" dark fixed height='68'>
        <v-toolbar-items>
            <v-btn flat  @click='goToHomePage'> <v-icon>home</v-icon> <span class='ml-2'>{{ $t('button.home') }}</span> </v-btn>
            <v-btn v-if='userLoggedIn === false' flat @click="toggleForm"> <v-icon> exit_to_app</v-icon> <span class='ml-2'>{{ $t('button.login') }}</span> </v-btn>
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
            <UserMenu v-if='userLoggedIn === true' v-on:userLoggedOut='userLoggedOut'/>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import axios from 'axios'
    import LogInForm from '../LogInForm'
    import UserMenu from '../UserMenu'
    import { HTTP } from '../../http-common'
    import setAuthorizationToken from '../../utils/setAuthToken'

    export default {
        name: 'TopHeader',
        components: { LogInForm, UserMenu },
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
                console.log(err.response.data.error.message)
                console.log("server error")
            })
            }
        },

        requestUser () {
			HTTP.get('user/data/').then(result => {
				if (result.data.success == false) {
					setAuthorizationToken(false)
					this.$router.push('/')
				} else {
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
          this.headerLocale = this.locale
    },
    filters: {
        capitalize (value) {
            if (!value) return ''
            return value.toString().toUpperCase()
        }
    },
    watch:
    {
        locale() {
            this.$i18n.locale = localStorage.locale;
        },
        '$route': 'fetchData',
    }
}
</script>
