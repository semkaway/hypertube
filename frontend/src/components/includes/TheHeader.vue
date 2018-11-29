<template>
  <div class="Header">
      <b-navbar toggleable="md" type="dark" variant="secondary" class="mx-1">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">{{ $t('button.home') }}</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav v-if="token === ''">
            <b-nav-item to="/login">{{ $t('button.login') }}</b-nav-item>
            <b-nav-item to="/register">{{ $t('button.register') }}</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown :text="$t('button.language')" :v-model="locale" right>
              <b-dropdown-item-button v-for="item in lang"
                                      :label="item.lang"
                                      :key="item.lang"
                                      :value="item.short"
                                      @click="language_change(item.short)">{{item.short}}</b-dropdown-item-button>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown  v-if="token !== ''"
                                  :text="$t('button.profile')">
              <b-dropdown-item-button label="profile"
                                      key="profile"
                                      value="profile">
                                      <router-link to="/user">{{ $t('profile.profile_title') }}</router-link>
              </b-dropdown-item-button>
              <b-dropdown-item-button label="settings"
                                      key="settings"
                                      value="settings">
                                      <router-link to="/user/settings">{{ $t('profile.settings_title') }}</router-link>
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="logout">{{ $t('button.logout') }}</b-dropdown-item-button>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
import {HTTP} from '../../http-common';

export default {
  data() {
    return {
      locale: 'en',
      token: localStorage.getItem('token'),
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
    }
  },
  methods: {
    language_change(val) {
      this.$i18n.locale = val
      localStorage.locale = val
      if (localStorage.token != '') {
        HTTP
          .put('user/change/locale', {
            'token': localStorage.token,
            'locale': val
          })
          .then(result => {
          if (result.data.success == false) {
              localStorage.token = ''
              this.$router.push('/')
            }
          })
          .catch((err) => {
            console.log(err.response.data.error.message)
            console.log("server error")
          })
        }

    },
    fetchData () {
      this.token = localStorage.token
      if (localStorage.locale) {
         this.$i18n.locale = localStorage.locale;
       }
    },
    logout() {
      localStorage.token = ''
      window.location.href = '/'
      // this.$router.push('/')
    }
 },
  created () {
    this.fetchData()
  },
  watch: {
    locale() {
      this.$i18n.locale = localStorage.locale;
    },
    '$route': 'fetchData'
  }
}
</script>

<style scoped>

a {
  color: black;
  text-decoration: none;
}

a:hover {
  color: #606266;
}

</style>
