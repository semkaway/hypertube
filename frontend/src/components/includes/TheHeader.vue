<template>
  <div class="Header">
      <b-navbar toggleable="md" type="dark" variant="secondary" class="mx-1">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">{{ $t('button.home') }}</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item to="/login">{{ $t('button.login') }}</b-nav-item>
            <b-nav-item to="/register">{{ $t('button.register') }}</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown text="Lang" :v-model="locale" right>
              <b-dropdown-item-button v-for="item in lang"
                                      :label="item.lang"
                                      :key="item.lang"
                                      :value="item.short"
                                      @click="language_change(item.short)">{{item.short}}</b-dropdown-item-button>
            </b-nav-item-dropdown>

            <b-nav-item to="/user">{{ $t('button.user') }}</b-nav-item>
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
      lang: {
        en: {
          lang: 'English',
          short: "en"
        },
        ru: {
          lang: 'Русский',
          short: "ru"
        },
        ua: {
          lang: 'Українська',
          short: "ua"
        },
      }
    }
  },
  methods: {
    language_change(val) {
      this.$i18n.locale = val
      localStorage.locale = val
      // if (localStorage.token != '') {
        // HTTP
        //   .post('user/someurl', {
        //     'token': localStorage.token
        //     'locale': val
        //   })
      // }
    }
 },
 mounted() {
   if (localStorage.token) {
     console.log(localStorage.token);
   }
    if (localStorage.locale) {
      this.$i18n.locale = localStorage.locale;
      console.log(localStorage.locale);
    }
  },
  watch: {
    locale() {
      this.$i18n.locale = localStorage.locale;
    }
  }
}
</script>

<style scoped>

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  color: #ffd04b;
}

</style>
