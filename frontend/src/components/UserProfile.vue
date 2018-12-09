<template>
  <v-container fluid grid-list-md class="mt-3 white">
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md2>
      </v-flex>
      <v-flex xs12 sm6 md8 class="mt-5">
        <div flat width="100%">
          <v-img :aspect-ratio="16/9" :src="bgImg | image">
            <v-layout pa-2 column fill-height class="lightbox white--text">
              <v-spacer></v-spacer>
              <v-layout shrink>
                <v-flex shrink>
                  <v-avatar size="90" tile style="border: 8px solid white; border-radius: 50%;" class="p-5 mb-3 ml-3">
                    <img  class='rounded round-img'
                          :aspect-ratio="16/9"
                          :src="user.image">
                  </v-avatar>
                </v-flex>
                <v-flex shrink>
                  <p class="display-3">{{user.first}} {{user.last}}</p>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-img>
        </div>
        <div class="display-3 text-center">Commented movies</div>
        <div style="position: relative">
          <v-btn
                absolute
                dark
                fab
                top
                right
                color="pink"
              >
                <v-icon>add</v-icon>
              </v-btn>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex v-for="pic in commentedMovies" xs12 md4 lg3>
                  <v-img  :aspect-ratio="1/1.5"
                          max-width="230"
                          :src="pic">
                  </v-img>
                </v-flex>
              </v-layout>
            </v-container>
            <v-btn
                absolute
                dark
                fab
                top
                right
                color="pink"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </div>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import {HTTP} from '../http-common';
import randomImage from '../utils/randomImage'

export default {
  name: 'UserPage',
  filters: {
    image: randomImage
  },
  data () {
    return {
      user: {},
      commentedMovies: [
        'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/408503/pexels-photo-408503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/618545/pexels-photo-618545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/287229/pexels-photo-287229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1313814/pexels-photo-1313814.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      ],
      bgImg: ''
      }
    },
      mounted() {
        HTTP
          .get('user/data/')
          .then(result => {
            console.log(result)
            if (result.data.success == true) {
              this.user = result.data
              console.log("email: "+this.user.email+" pendingEmail: "+this.user.pendingEmail+" intra: "+this.user.intra+" git: "+this.user.github+" pass: "+this.user.password)
              if (this.user.image === null) {
                this.user.image = "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              }
            } else if (result.data.success == false) {
              setAuthorizationToken(false)
              this.$router.push('/')
            }
          })
          .catch((err) => {
            console.log(err)
            localStorage.token = ''
            this.$router.push('/')
          })
        // let user_id = window.location.pathname.split('/')[2]
        // HTTP
        //   .get('user/commented-movies/'+user_id)
        //   .then(result => {
        //     console.log(result)
            // for(let i = 0; i < result.data.movieIds.length; i++) {
            //   HTTP.get('https://api.themoviedb.org/3/movie/'+result.data.movieIds[i]+'?api_key=09665afd54623c9413c3f9336484b01c&language='+localStorage.locale)
            //   .then(movie => {
            //     this.commentedMovies.push(movie)
            //   })
            //   .catch((err) => {
            //     console.log(err)
            //     console.log('tmdb error')
            //   })
            // }
            // console.log(this.commentedMovies)
            // if (result.data.success == true) {
            //   this.user = result.data
            //   console.log("email: "+this.user.email+" pendingEmail: "+this.user.pendingEmail+" intra: "+this.user.intra+" git: "+this.user.github+" pass: "+this.user.password)
            //   if (this.user.image === null) {
            //     this.user.image = "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            //   }
            // } else if (result.data.success == false) {
            //   setAuthorizationToken(false)
            //   this.$router.push('/')
            // }
          // })
          // .catch((err) => {
          //   console.log(err)
          // })
      },
      methods: {
      }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.profilePic {
  border: 5px white;
}

</style>
