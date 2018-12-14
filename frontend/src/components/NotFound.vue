<template>
  <v-container grid-list-md class="mt-5">
    <v-layout row wrap>
      <v-flex lg3></v-flex>
      <v-flex lg6>
        <v-layout row wrap class="mt-5">
          <v-flex xs12>
            <img style="-webkit-transform: scaleX(-1);  transform: scaleX(-1);" height="180vw" src="https://derpicdn.net/img/2016/11/27/1304535/full.png">
          </v-flex>
          <v-flex xs12 class="mr-4 mt-4 ml-4 text-xs-center">
            <div style="font-size: 1.3rem;">Well, this is unpleasant. Let's just pretend you didn't see it.</div>
            <!-- <div style="font-size: 1.3rem;">Хм, вот это неприятность. Давайте сделаем вид, что Вы этого не видели.</div> -->
            <!-- <div style="font-size: 1.3rem;">Оце так неприємність. Давайте зробимо вигляд, що Ви цього не бачили.</div> -->
            <v-btn  color="blue-grey lighten-1"
                    class="white--text mt-4 ma-0">
                    <router-link to="/">{{$t('button.home')}}</router-link>
                  </v-btn>
          </v-flex>
          <v-flex xs12 style="position: relative;">
            <img height="180vw" style="position: absolute; right: 0;" src="http://images6.fanpop.com/image/photos/41400000/surprised-fluttershy-by-decprincess-d7zlcri-fluttershy-mlp-fim-41458993-781-1022.png">
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex lg3></v-flex>
    </v-layout>
  </v-container>

</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>

<style scoped>

  a {
    text-decoration: none;
    color: white;
  }

</style>
