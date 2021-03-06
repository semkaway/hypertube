<template>
 <div v-if='userLoggedIn == true' class="mt-5" style='height: 100%;'>
   <Loader :run='runLoader'/>
  <v-container v-if='loaded' fluid grid-list-md class="mt-3 white" style='height: 100%;'>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-card flat>
          <v-img v-if='movie' :src="movie.poster_path"></v-img>
          <v-list one-line>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="blue-grey darken-2">date_range</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{movie.release_date | date}}</v-list-tile-title>
                <v-list-tile-sub-title>{{$t('movie.year')}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="blue-grey darken-2">star</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{movie.vote_average}}</v-list-tile-title>
                <v-list-tile-sub-title>{{$t('movie.rating')}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

          <v-list-tile v-if="movie.runtime > 0">
            <v-list-tile-action>
              <v-icon color="blue-grey darken-2">access_time</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{movie.runtime}} min</v-list-tile-title>
              <v-list-tile-sub-title>{{$t('movie.duration')}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset v-if="movie.runtime > 0"></v-divider>

          <v-list-tile v-if="genres.length != 0">
            <v-list-tile-action>
              <v-icon color="blue-grey darken-2">drag_indicator</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{genres}}</v-list-tile-title>
              <v-list-tile-sub-title class="text-capitalize">{{$t('movie.genres')}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset v-if="genres.length > 0"></v-divider>

        </v-list>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6 class="px-3">
        <v-card flat class="p-2" style="word-break: break-all;">
          <div style="font-size: 2rem;">{{movie.title}}</div>
          <div class="subheading mb-2">{{movie.tagline}}</div>
          <v-card-text class="p-1 pb-3">{{movie.overview}}</v-card-text>
          <div v-if="!qualitySelected" class="text-xs-center">
            <v-img :src="movie.backdrop_path">
            </v-img>
            <div class="mt-3">
              <v-btn  v-if="quality.includes('720p')"
                      @click="selectQuality('720p')"
                      color="blue-grey lighten-1"
                      dark
                      style="outline: none;">{{$t('button.watchIn')}} 720p
                    </v-btn>
              <v-btn  v-if="quality.includes('1080p')"
                      @click="selectQuality('1080p')"
                      color="blue-grey lighten-1"
                      dark
                      style="outline: none;">{{$t('button.watchIn')}} 1080p
                    </v-btn>
              <div v-if="!quality.includes('720p') && !quality.includes('1080p')">
                <div v-if="movie.release_date && movie.release_date < '2017'" style="font-size: 1.5rem; letter-spacing: 13px;" class="font-weight-regular text-uppercase">
                  {{$t('button.notComing')}}
                </div>
                <div v-else style="font-size: 1.5rem; letter-spacing: 13px;" class="font-weight-regular text-uppercase">
                  {{$t('button.comingSoon')}}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-xs-center">

            <video id="moviePlayer" ref="videoRef" width="100%" :poster="movie.backdrop_path" controls controlsList="nodownload" crossorigin="anonymous">
              <source v-if="movieSource" :src="movieSource" type="video/mp4"/>
						<track v-if='subtitles.enSubs' :src='subtitles.enSubs.file' kind="captions" srclang='en'/>
						<track v-if='subtitles.ruSubs' :src='subtitles.ruSubs.file' kind="captions" srclang='ru'/>
            		Your browser does not support the video tag.
            </video>
          </div>

          <comments :allComments="movie.comments"
                    :totalNumberOfComments="totalNumberOfComments"
                    @submit-comment="submitComment"></comments>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3 v-if="this.$i18n.locale === 'en'">
        <v-card flat>
          <v-list two-line>
            <div v-if='showCrew'>
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
            </div>
            <div v-if='showActors'>
              <v-subheader>
                  {{$t('movie.cast')}}
                </v-subheader>
              <template v-for="actor in this.actors">
                <v-list-tile v-if="actors">
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
            </div>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3 v-else>
        <v-card flat v-if='showSimilar'>
          <v-list two-line>
            <template >

			<v-subheader>{{ $t('movie.similar')}} </v-subheader>

			<div v-for="(similar,index) in this.similar">
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
                    <v-icon size="10" style="display: inline-block; vertical-align: middle;">date_range</v-icon>
                    {{similar.release_date | date}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title  >
                    <v-icon size="10" style="display: inline-block; vertical-align: middle;">star</v-icon>
                    {{similar.vote_average}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
			  </div>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container v-else-if='!loaded && !runLoader'>
   	<v-layout row wrap justify-center align-center class='mt-5 headline'> {{$t('button.notComing')}}</v-layout>
  </v-container>
  </div>
</template>

<script>

import { HTTP } from '../http-common'
import { URL_PATH } from '../utils/constants'
import axios from 'axios'
import Loader from './Loader'
import Comments from './Comments'
import showYear from '../utils/showYear'
import setDefaultPosterPath from '../utils/setDefaultPosterPath'
import setAuthorizationToken from '../utils/setAuthToken'

export default {
  name: 'Movie',
  components: { Loader, Comments },
  filters: { date: showYear },
  props: ['user', 'userLoggedIn'],
  data () {
    return {
        token: '',
        runLoader: true,
        movie: [],
        movieYear: 'movie.release_date',
        genres: '',
        actors: [],
        crew: [],
        similar: [],
        movieSource: '',
        qualitySelected: false,
        progressColor: '#616161',
        totalNumberOfComments: 0,
		quality: [],
		loaded: false,
		showSimilar: false,
        showCrew: false,
        showActors: false,
		subtitles: {}
      }
    },

    mounted () {
      this.rerender()
    },

	created() {
		if (localStorage.locale == 'en' || localStorage.locale  == 'ru' || localStorage.locale == 'uk') {
 			this.$i18n.locale = localStorage.locale
		}
        else {
            localStorage.locale = 'en'
            this.$i18n.locale = 'en'
        }
	},

    methods: {
      rerender() {
		this.loaded = false
        this.runLoader = true
        HTTP.get('movie/one/' + this.$route.params.id).then(result => {
			this.loaded = true
			this.similar = []
			this.actors = []
			this.genres = []
			this.crew = []
			this.movieSource = ''
      		this.qualitySelected = false
			this.quality = []
			this.totalNumberOfComments = 0
            if (result.data.success == true) {
              let movie = result.data.data
                for(var key in movie) {
                    if (key == 'genres') {
                      for (let i = 0; i < movie[key].length; i++) {
                        this.genres += movie[key][i].name.charAt(0).toUpperCase() + movie[key][i].name.slice(1)+', ';
                      }
                    }
                    if (key == 'poster_path') {
                      setDefaultPosterPath(movie)
                    }
                    if (key == 'backdrop_path') {
                      if (movie[key] == null) {
                        movie[key] = 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                      } else {
                        movie[key] = 'http://image.tmdb.org/t/p/original'+movie[key]
                      }
                    }
                    if (key == 'credits') {
                      for (let j = 0; j != 5; j++) {
                        if (!movie[key].cast[j]) {
          							  break
          						  }
                        this.actors.push(movie[key].cast[j])
                      }
                      for (let k = 0; k < movie[key].crew.length; k++) {
                        if (!movie[key].crew[k]) {
          							  break
          						  }
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
          						  if (!movie[key].results[j]) {
          							  break
          						  }
                        this.similar.push(movie[key].results[j])
                      }
                    }
                  }
              		this.movie = movie
					if (this.movie.subtitle_array) {
						this.subtitles = this.movie.subtitle_array
					} else {
						this.subtitles = {}
					}
				if (movie.torrent.torrents !== undefined) {
					for(key in movie.torrent.torrents.en) {
						this.quality.push(key)
					}
				}
				this.genres = this.genres.slice(0, this.genres.length - 2)
				this.comments = movie.comments
				this.totalNumberOfComments = movie.comments.length
            } else if (result.data.success == false) {
				setAuthorizationToken(false);
				this.$router.push('/')
            }
            this.runLoader = false
			this.showSimilar = this.similar.length > 0
      		this.showCrew = this.crew.length > 0
      		this.showActors = this.actors.length > 0
          })
          .catch((err) => {
            console.log('Server error:', err)
            this.runLoader = false
			this.showSimilar = this.similar.length > 0
			this.showCrew = this.crew.length > 0
			this.showActors = this.actors.length > 0
          })
      },

      submitComment(newComment) {
			HTTP.post('movie/comment', {'movieId': this.$route.params.id, 'text': newComment}).then(response => {
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
				 console.log('Server error:', err)
			})
      	},

      	selectQuality(quality) {
			if (quality == '720p' || quality == '1080p') {
				if (this.quality.includes(quality)) {
					this.movieSource = `${URL_PATH}/api/movie/stream/${this.$route.params.id}?quality=${quality}&token=${localStorage.token}`
					this.qualitySelected = true
				}
			}
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
  color: #455A64;
}

</style>
