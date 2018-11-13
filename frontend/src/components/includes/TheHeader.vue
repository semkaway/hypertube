<template>
  <div class="Header">
      <b-navbar toggleable="md" type="light" variant="light" class="mx-1">

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

            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
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
    }
 },
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
