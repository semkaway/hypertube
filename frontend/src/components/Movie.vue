<template>
 <div class="mt-5">
   <v-container v-if="value">
     <v-layout row justify-center>
      <v-dialog v-model="value" persistent content content-class="centered-dialog">
        <v-container fill-height>
          <v-layout column justify-center align-center>
            <self-building-square-spinner :animation-duration="1500" :size="64" :color="progressColor" />
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
  </v-container>
  <v-container fluid grid-list-md class="mt-3">
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-card flat>
          <v-img :src="movie.poster_path"></v-img>
          <v-list one-line>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon>date_range</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{movie.release_date}}</v-list-tile-title>
                <v-list-tile-sub-title>{{$t('movie.year')}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon>star</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{movie.vote_average}}</v-list-tile-title>
                <v-list-tile-sub-title>{{$t('movie.rating')}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>access_time</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{movie.runtime}} min</v-list-tile-title>
              <v-list-tile-sub-title>{{$t('movie.duration')}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>drag_indicator</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{genres}}</v-list-tile-title>
              <v-list-tile-sub-title class="text-capitalize">{{$t('movie.genres')}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6>
      <v-card light flat class="p-2">
        <h1>{{movie.title}}</h1>
        <p class="subheading">{{movie.tagline}}</p>
        <v-card-text>{{movie.overview}}</v-card-text>
        <!-- <vue-plyr ref="player"> -->
            <!-- <video id="moviePlayer">
                <source v-if="movieSource" :src="movieSource" type="video/mp4"> -->
                <!-- <source :src="movieSource" type="video/mp4"/> -->
                <!-- <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default> -->
            <!-- </video> -->
        <!-- </vue-plyr> -->
        <div width="100%">
          <video ref="videoRef" width="600" :poster="movie.backdrop_path" controls>
            <source v-if="movieSource" :src="movieSource" type="video/mp4">
          Your browser does not support the video tag.
          </video>
        </div>
        <v-list three-line>
          <v-subheader>
              {{$t('movie.comments')}}
            </v-subheader>
            <v-textarea
                name="input-7-1"
                box
                label="Label"
                auto-grow
                v-model="comment"
                :value="comment"
              ></v-textarea>
              <v-btn color="success" @click="leaveComment">Success</v-btn>
            <template v-for="comment in movie.comments">
              <v-list-tile>
                <v-list-tile-avatar v-else
                                    size="55"
                                    class="actorPicture mr-2"
                                    :src="comment.image"
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title><a :href="'profile/'+comment.user_id" target="_blank">{{comment.first}}</a></v-list-tile-title>
                    <v-list-tile-sub-title>{{comment.text}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
        </v-list>
      </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3 v-if="this.$i18n.locale === 'en'">
        <v-list two-line>
          <v-subheader>
              {{$t('movie.crew')}}
            </v-subheader>
            <template v-for="crew in this.crew">
              <v-list-tile>
                <v-list-tile-avatar v-if="crew.profile_path !== null"
                                    size="55"
                                    class="actorPicture mr-2"
                                    :style="{ 'background-image':'url(' + `http://image.tmdb.org/t/p/w300`+crew.profile_path + ')'}">
                </v-list-tile-avatar>

                <v-list-tile-avatar v-else
                                    size="55"
                                    class="actorPicture mr-2"
                                    :style="{ 'background-image':`url('https://images.pexels.com/photos/1468389/pexels-photo-1468389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350')`}">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{crew.job}}</v-list-tile-title>
                  <v-list-tile-sub-title><a :href="'https://www.google.com.ua/search?q='+crew.name" target="_blank">{{crew.name}}</a></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          <v-divider inset></v-divider>
          <v-subheader>
              {{$t('movie.cast')}}
            </v-subheader>
          <template v-for="actor in this.actors">
            <v-list-tile>
              <v-list-tile-avatar v-if="actor.profile_path !== null"
                                  size="55"
                                  class="actorPicture mr-2"
                                  :style="{ 'background-image':'url(' + `http://image.tmdb.org/t/p/w300`+actor.profile_path + ')'}">
              </v-list-tile-avatar>

              <v-list-tile-avatar v-else
                                  size="55"
                                  class="actorPicture mr-2"
                                  :style="{ 'background-image':`url('https://images.pexels.com/photos/134/light-creative-abstract-colorful.jpg?auto=compress&cs=tinysrgb&dpr=2&h=350')`}">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{actor.character}}</v-list-tile-title>
                <v-list-tile-sub-title><a :href="'https://www.google.com.ua/search?q='+actor.name" target="_blank">{{actor.name}}</a></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
  </div>

</template>

<script>

import {HTTP} from '../http-common';
import axios from 'axios'
import {SelfBuildingSquareSpinner} from 'epic-spinners'

export default {
  name: 'Movie',
  components: {
      SelfBuildingSquareSpinner
    },
  data () {
    return {
        token: '',
        value: true,
        movie: [],
        movieYear: 'movie.release_date',
        genres: '',
        actors: [],
        crew: [],
        movieSource: '',
        progressColor: '#616161',
        comment:''
      }
    },
    beforeCreate() {
      HTTP
        .get('movie/one/'+this.$route.params.id)
        .then(result => {
          if (result.data.success == true) {
            let movie = result.data.data
              for(var key in movie) {
                  if (key == 'genres') {
                    for (var i = 0; i < movie[key].length; i++) {
                      this.genres += movie[key][i].name.charAt(0).toUpperCase() + movie[key][i].name.slice(1)+', ';
                    }
                  }
                  if (key == 'poster_path') {
                    if (movie[key] == null) {
                      movie[key] = 'https://images.pexels.com/photos/1612462/pexels-photo-1612462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                    } else {
                      movie[key] = 'http://image.tmdb.org/t/p/original'+movie[key]
                    }
                  }
                  if (key == 'backdrop_path') {
                    if (movie[key] == null) {
                      movie[key] = 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                    } else {
                      movie[key] = 'http://image.tmdb.org/t/p/original'+movie[key]
                    }
                  }
                  if (key == 'release_date') {
                    movie[key] = movie[key].split('-')[0]
                  }
                  if (key == 'credits') {
                    for (var j = 0; j != 5; j++) {
                      this.actors.push(movie[key].cast[j])
                    }
                    for (var k = 0; k < movie[key].crew.length; k++) {
                      if (movie[key].crew[k].job === 'Director' || movie[key].crew[k].job === 'Producer') {
                        this.crew.push(movie[key].crew[k])
                      }
                    }
                  }
                }
            this.movie = movie
            const moviePlayer = document.getElementById('moviePlayer')
            // console.log(moviePlayer)
            // console.log(movie.torrent.torrents.en['720p']
            for(key in movie.torrent.torrents.en) {
                // moviePlayer.innerHTML += '<source src="http://localhost:3000/api/movie/stream/'+this.$route.params.id+'?quality='+key+'&token='+localStorage.token+'" type="video/mp4" size="'+key+'">'
                // console.log(moviePlayer)
                console.log(encodeURIComponent(movie.torrent.torrents.en[key].url))
                // this.movieSource = "http://localhost:3000/api/movie/stream/"+this.$route.params.id+'?quality='+key+'&token='+localStorage.token;
            }
            console.log(  this.$refs.videoRef)
            this.$refs.videoRef.src = "http://localhost:3000/api/movie/stream/"+this.$route.params.id+'?quality='+720+'p&token='+localStorage.token;
            // this.$refs.videoRef.play();
            // this.movieSource = "http://localhost:3000/api/movie/stream/"+this.$route.params.id+'?quality='+720+'&token='+localStorage.token;

            // let playerPromise = this.player.play()
            //
            // this.player.on('pause', () => {
            //   if (playerPromise !== undefined) {
            //     playerPromise.then(_ => {
            //       this.player.pause();
            //     })
            //     .catch(error => {
            //       console.log('Can\'t pause, sorry :(')
            //     })
            //   }
            // })

            // var onplaying = true;
            // var onpause = false;

            // On video playing toggle values
            // this.player.onplaying = function() {
            //   console.log('onplaying')
            //     onplaying = true;
            //     onpause = false;
            // };

            // On video pause toggle values
            // this.player.onpause = function() {
            //   console.log('onpause')
            //     onplaying = false;
            //     onpause = true;
            // };

            // this.player.on('play',() => {
            //   console.log('PLAAAAAAY')
            //   this.player.onplaying()
            //   console.log('buffered ', this.player.buffered)
            //   if (this.player.paused && !onplaying) {
            //       this.player.play();
            //   }
            // })

            // this.player.on('pause',() => {
            //   console.log('PAAAAAAUSEEEE')
            //   this.player.onpause()
            //   console.log('!this.player.paused: ', this.player.paused)
            //   console.log('!onpause: ', onpause)
            //   console.log('this.player.buffered > 0: ', this.player.buffered > 0)
            //   if (!this.player.paused && !onpause && (this.player.buffered > 0)) {
            //     console.log('i am here')
            //       this.player.pause();
            //       console.log('> 0')
            //   } else {
            //     return false
            //   }
              // if (!this.player.paused && !onpause && (this.player.buffered != 0)) {
              //     console.log('!= 0')
              // }
             // })
            // Initializing values


            // // Play video function
            // function playVid() {
            //     if (this.player.paused && !onplaying) {
            //         this.player.play();
            //     }
            // }

            // Pause video function
            // function pauseVid() {
            //     if (!this.player.paused && !onpause) {
            //         this.player.pause();
            //     }
            // }
            this.value = false
            console.log(movie)
            this.genres = this.genres.slice(0, this.genres.length-2)
          } else if (result.data.success == false) {

          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // computed: {
    //   player () { return this.$refs.player.player }
    // },
    methods: {
      streamMovie() {
        let quality = 720
        console.log('stream')
        HTTP.get('movie/stream/'+this.$route.params.id+'?quality='+quality+'p&token='+localStorage.token)
        .then(response =>
          console.log(response)
        )
        .catch(err => {
          console.log(err)
        })
        console.log('here')
      },
      leaveComment() {
        HTTP.post('movie/comment', {'movieId': this.$route.params.id, 'text': this.comment})
        .then(response =>
          console.log(response)
        )
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

.actorPicture {
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

a {
  text-decoration: none;
}

.dialog.centered-dialog {
  background: #282c2dad;
  box-shadow: none;
  border-radius: 6px;
  width: auto;
  color: whitesmoke;
}

</style>
