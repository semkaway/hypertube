<template>
  <v-container v-if='userLoggedIn == true' grid-list-md text-xs-center class="mt-5">
    <Loader :run='runLoader'/>
      <v-flex lg12>
	  <SearchBar v-on:searchMovies='searchMovies'
		:searchAppText='searchAppText'
		:searchAppParams='searchAppParams'
		v-on:handleChangeFromDate='handleChangeFromDate'
		v-on:handleChangeToDate='handleChangeToDate'
	  />
        <div class="mt-4" style="font-size: 1.3rem;" v-if="notFound">{{ $t('movies.notFound') }}</div>
        <v-container grid-list-md>
          <v-layout row wrap class="mt-3">
            <v-flex v-for="(movie, index) in movies" :key='index' class="movie" xs12 md4 lg3>
              <v-hover>
                 <v-card
                   slot-scope="{ hover }"
                   class="mx-auto"
                   color="grey lighten-5"
                   flat
                   max-width="250"
                 >
                 <router-link :to="'/movies/'+movie.id">
                   <v-img :aspect-ratio="1/1.5" :src="movie.poster_path">
                    <div v-for="(watched, index) in watchedMovies"
                              :key='index'
                              v-if="watched.id === movie.id"
                              style="opacity: 0.5; background-color: white; height: 100%;"
                              ></div>
                     <v-layout slot="placeholder"
                               fill-height
                               align-center
                               justify-center
                               ma-0
                               >
                       <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
                     </v-layout>
                     <v-expand-transition>
                      <div  v-if="hover"
    					              class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal subheading white--text"
    					              style="height: 13%; opacity: 0.9;">
            						<div class='mt-3' style='display: flex; align-items: flex-end; justify-content: space-around;'>
            							<div>
            								<p><v-icon color="white">calendar_today</v-icon> {{movie.release_date | date}}</p>
            							</div>
            							<div>
            								<p><v-icon color="white">star</v-icon> {{movie.vote_average}}</p>
            							</div>
            						</div>
                      </div>
                     </v-expand-transition>
                   </v-img>
                   </router-link>
                 </v-card>
               </v-hover>
              <p class="mt-2 subheading">{{movie.title}}</p>
            </v-flex>
          </v-layout>
        </v-container>
        <v-flex class="text-xs-center">
        <v-btn  v-if="page < totalPages"
        color="blue-grey lighten-1"
        dark large
                style="outline: none;"
                @click="showMore">{{$t('button.showMore')}}
              </v-btn>
        </v-flex>
      </v-flex>
  </v-container>
	<NotFound v-else />
</template>

<script>
	import axios from 'axios'
	import NotFound from './NotFound'
	import SearchBar from './SearchBar'
  	import Loader from './Loader'
	import { HTTP } from '../http-common'
	import * as constants from '../utils/constants'
  	import setAuthorizationToken from '../utils/setAuthToken'
  	import showYear from '../utils/showYear'
  	import setDefaultPosterPath from '../utils/setDefaultPosterPath'

	export default {
		name: 'Movies',
		components: { NotFound, SearchBar, Loader },
    	filters: { date: showYear },
		props: ['user', 'userLoggedIn', 'locale', 'token', 'searchAppText', 'searchAppParams', 'userAppSetDate'],
		data () {
			return {
				movies: [],
				page: 1,
				query: `https://api.themoviedb.org/3/discover/movie`,
				totalPages: 1,
				defaultParams: {
					api_key: constants.API_KEY,
					language: this.locale,
					include_image_language: this.locale,
					page: 1,
					include_adult: false,
				},
				searchText: '',
				userParams: {},
				notFound: false,
        		watchedMovies: [],
        		runLoader: true,
				userSetDate: false,
			}
		},

    methods: {
      	requestMovies(filters) {
          	this.notFound = false
          	this.runLoader = true
			let query = this.query
			let searchParams = {}

			if (filters && !this.searchText.length) {
				searchParams = Object.assign({}, this.userParams)
			} else {
				searchParams = Object.assign({}, this.defaultParams)
				if (this.searchText.length)  {
					searchParams.query = this.searchText
					query = 'https://api.themoviedb.org/3/search/movie'
				}
			}
			searchParams.page = this.page
			searchParams.api_key = constants.API_KEY
			const token = axios.defaults.headers.common['Authorization']
			delete axios.defaults.headers.common['Authorization']
			HTTP.get(query, { params: searchParams } ).then(result => {
				if (result.data.total_results == 0) {
					this.notFound = true
					this.totalPages = 1
					this.runLoader = false
					return false
				}
				setDefaultPosterPath(result.data.results)
				for (var i = 0; i < result.data.results.length; i++) {
					this.movies.push(result.data.results[i])
				}
				this.totalPages = result.data.total_pages
       			this.runLoader = false
			}).catch((e) => { console.log('Error:', e);	this.runLoader = false })
			setAuthorizationToken(token)
      	},

        getUserWatchedMovies() {
			this.runLoader = true
			HTTP.get('/movie/watched').then(result => {
				if (result.data.success == true) {
					this.currentUser = true
					setDefaultPosterPath(result.data.movies)
					this.watchedMovies = result.data.movies
					this.requestMovies(this.searchAppParams.with_genres || this.searchAppParams.sort_by || this.userAppSetDate)
				} else if (result.data.success == false) {
					setAuthorizationToken(false)
					this.$router.push('/')
				}
				this.runLoader = false
			})
			.catch((error) => {
				console.log('Error:', error)
				this.runLoader = false
			})
        },

      	showMore () {
			if (this.page + 1 < this.totalPages)
				this.page = this.page + 1;
			else
				this.page = this.totalPages;
			this.requestMovies(this.searchAppParams.with_genres || this.searchAppParams.sort_by || this.userAppSetDate)
      	},

		searchMovies(searchConditions) {
			const { fromDate, toDate, searchText, sort, genre } = searchConditions
			let searchParams = {
				"release_date.gte": fromDate,
				"release_date.lte": toDate,
			}
			searchParams.with_genres = genre ? genre : ''
			searchParams.sort_by = sort ? sort : ''
			this.searchText = searchText.length ? searchText : ''
			this.movies = []
			this.page = 1
			this.userParams = Object.assign({}, this.defaultParams)
			this.userParams = Object.assign(this.userParams, searchParams)
			this.$emit('setSearchParams', this.userParams, this.searchText, this.userSetDate)
			this.requestMovies(true)
		},

		handleChangeFromDate(date) {
			this.$emit('setSearchParams', Object.assign(this.searchAppParams, {'release_date.gte': parseInt(date)}), this.searchAppText, true)
		},

		handleChangeToDate(date) {
			this.$emit('setSearchParams', Object.assign(this.searchAppParams, {'release_date.lte': parseInt(date)}), this.searchAppText, true)
		}

    },

    mounted () {
		this.userParams = this.searchAppParams
		this.searchText = this.searchAppText
		this.userSetDate = this.userAppSetDate
        this.getUserWatchedMovies()
    },

	watch: {
		userAppSetDate(newValue) { this.userSetDate = newValue }
	}

  }
</script>

<style scoped>

	.v-card--reveal {
		align-items: center;
		bottom: 0;
		justify-content: center;
		opacity: .5;
		position: absolute;
		width: 100%;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

</style>
