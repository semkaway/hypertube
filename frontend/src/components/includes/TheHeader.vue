<template>
  <div class="Header">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1"><router-link to="/">{{ $t('button.home') }}</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/login">{{ $t('button.login') }}</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/register">{{ $t('button.register') }}</router-link></el-menu-item>
          <el-menu-item index="4"><router-link to="/confirm">CONFIRMATION</router-link></el-menu-item>
          <label for="locale"></label>
          <el-select v-model="locale" id="lang-select">
            <el-option
              v-for="item in lang"
              :key="item.lang"
              :label="item.lang"
              :value="item.short">
              <span style="float: left">{{ item.lang }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.short }}</span>
            </el-option>
          </el-select>
      </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
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

 },
 watch: {
   locale (val) {
     this.$i18n.locale = val
   }
 },
}
</script>

<style scoped>
.el-select {
  margin-top: 1.4vh;
}
</style>
