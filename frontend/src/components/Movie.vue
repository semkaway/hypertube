<template>
 <div v-if='userLoggedIn == true' class="mt-5">
   <Loader :run='runLoader'/>
  <v-container fluid grid-list-md class="mt-3 white">
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
                <v-list-tile-title>{{movie.release_date | date}}</v-list-tile-title>
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

          <v-divider inset></v-divider>

        </v-list>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6 class="p-3">
        <v-card flat class="p-2" style="word-break: break-all;">
          <h1>{{movie.title}}</h1>
          <p class="subheading">{{movie.tagline}}</p>
          <v-card-text class="p-1 pb-3">{{movie.overview}}</v-card-text>
			

          <div width="100%">
            <video id="moviePlayer"  width="600" :poster="movie.backdrop_path" controls crossorigin="anonymous">
              <source :src='sources[0] ? sources[0].src : ""' type="video/mp4">
            		Your browser does not support the video tag.
            </video>
          </div>

		  <!-- http://vjs.zencdn.net/v/oceans.mp4 -->


          <comments :allComments="movie.comments"
                    :totalNumberOfComments="totalNumberOfComments"
                    @submit-comment="submitComment"></comments>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3 v-if="this.$i18n.locale === 'en'">
        <v-card flat>
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
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3 v-else>
        <v-card flat>
          <v-list two-line>
            <v-subheader>
              {{$t('movie.similar')}}
            </v-subheader>
            <template v-for="(similar,index) in this.similar">
              <v-list-tile class="mt-2">
                <v-list-tile-avatar v-if="similar.poster_path !== null"
                                    size="55"
                                    class="actorPicture mr-2"
                                    :style="{ 'background-image':'url(' + `http://image.tmdb.org/t/p/w300`+similar.poster_path + ')'}">
                </v-list-tile-avatar>

                <v-list-tile-avatar v-else
                                    size="55"
                                    class="actorPicture mr-2"
                                    :style="{ 'background-image':`url('https://images.pexels.com/photos/1468389/pexels-photo-1468389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350')`}">
                </v-list-tile-avatar>

                <v-list-tile-content>
                <v-list-tile-title> <router-link :key="$route.fullPath" :to="'/movies/' + similar.id" exact>{{similar.title}} </router-link></v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-icon size="10" style="display: inline-block; vertical-align: middle;">calendar_today</v-icon>
                    {{similar.release_date | date}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    <v-icon size="10" style="display: inline-block; vertical-align: middle;">star</v-icon>
                    {{similar.vote_average}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
  <NotFound v-else />
</template>

<script>

import {HTTP} from '../http-common';
import axios from 'axios'
import Loader from './Loader'
import Comments from './Comments'
import NotFound from './NotFound'
import showYear from '../utils/showYear'

export default {
  name: 'Movie',
  components: { Loader, Comments, NotFound },
  filters: { date: showYear },
  props: ['user', 'userLoggedIn', 'token'],
  data () {
    return {
        runLoader: true,
        movie: [],
        movieYear: 'movie.release_date',
        genres: '',
        actors: [],
        crew: [],
        similar: [],
        movieSource: '',
        progressColor: '#616161',
        totalNumberOfComments: 0,
		sources: []
      }
    },
    mounted () {
		this.rerender()
	},

    methods: {

      rerender() {		 
        this.runLoader = true
        HTTP.get('movie/one/'+this.$route.params.id).then(result => {
			console.log('result ->', result)
            if (result.data.success == true) {
              let movie = result.data.data
                for(var key in movie) {
                    if (key == 'genres') {
                      for (var i = 0; i < movie[key].length; i++) {
                        this.genres += movie[key][i].name.charAt(0).toUpperCase() + movie[key][i].name.slice(1) + ', '
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
                    if (key == 'comments') {
                      for (let j = 0; j < movie[key].length; j++) {
                        if (movie[key][j].image === null) {
                          	movie[key][j].image = this.user.image
                        }
                      }
                    }
                    if (key == 'similar') {
                      for (let j = 0; j < 10; j++) {
                        this.similar.push(movie[key].results[j])
                      }
                    }
                }
				this.movie = movie
				this.genres = this.genres.slice(0, this.genres.length - 2)
				this.comments = movie.comments
				this.totalNumberOfComments = movie.comments.length
				console.log('movie! ->', movie)
				if (movie.torrent.torrents !== undefined) {
					for(key in movie.torrent.torrents.en) {
						this.sources.push({src: `http://localhost:3000/api/movie/stream/${this.$route.params.id}?quality=${key}&token=${localStorage.token}`})
						// this.sources[i].track = `<track kind="captions" label="English" srclang="en" src="${movie.subtitle}" default>`
						i++
					}
					console.log('this.sources =>', this.sources)
				} else {
					// dont show player
				}
            } else if (result.data.success == false) {
				// show error
            }
            this.runLoader = false
          })
          .catch((err) => {
            console.log('error =>', err)
            this.runLoader = false
          })
      },

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
      submitComment(newComment) {
        console.log('user: ', this.user)

        HTTP.post('movie/comment', {'movieId': this.$route.params.id, 'text': newComment})
        .then(response => {
          console.log(response)
          if (response.data.success) {
            this.movie.comments.unshift({
              date: response.date,
              first: this.user.first,
              image: this.user.image,
              text: newComment,
              user_id: this.user.user_id
            })
            this.totalNumberOfComments = this.movie.comments.length
          } else {
            this.$emit('userActivate', 'activation.error_alert')
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      playVideo(evt) {
        evt.preventDefault()
        console.log('yo playing')
      },
      showNewMovie(id) {
        console.log('id: ', id)
        this.$router.replace(`/movies/${id}`)
      }
    },

    watch: {
      	'$route.params.id': function (id) {
       	 this.rerender()
   		}
 },
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

</style>
