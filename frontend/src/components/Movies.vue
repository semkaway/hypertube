<template>
  <v-container v-if='userLoggedIn == true' grid-list-md text-xs-center class="mt-5">
      <v-flex lg12>
	  <SearchBar v-on:searchMovies='searchMovies'/>
        <div v-if="notFound">{{ $t('movies.notFound') }}</div>
        <v-container grid-list-md>
          <v-layout row wrap class="mt-3">
            <v-flex v-for="(movie, index) in movies" :key='index' class="movie" xs12 md4 lg3>
                <router-link :to="'/movies/'+movie.id">
                  <v-hover>
                   <v-card
                     slot-scope="{ hover }"
                     class="mx-auto"
                     color="grey lighten-5"
                     flat
                     max-width="250"
                   >
                     <v-img :aspect-ratio="1/1.5" :src="movie.poster_path">
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
      					              style="height: 100%; opacity: 0.9;">
                         <v-layout row wrap>
                            <v-flex xs12>
                            	<p><v-icon color="white">calendar_today</v-icon> {{movie.release_date | date}}</p>
                            </v-flex>
                            <v-flex xs12>
                            	<p><v-icon color="white">star</v-icon> {{movie.vote_average}}</p>
                            </v-flex>
                        </v-layout>
                        </div>
                       </v-expand-transition>
                     </v-img>
                   </v-card>
                 </v-hover>
                 <p class="mt-2 subheading">{{movie.title}}</p>
                </router-link>
            </v-flex>
          </v-layout>
        </v-container>
        <v-flex class="text-xs-center">
        <v-btn  v-if="page < totalPages"
                depressed
                color="grey"
                class="white--text mt-3"
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
	import { HTTP } from '../http-common'
	import * as constants from '../utils/constants'
  import setAuthorizationToken from '../utils/setAuthToken'
  import showYear from '../utils/showYear'

	export default {
		name: 'Movies',
		components: { NotFound, SearchBar },
    filters: { date: showYear },
		props: ['user', 'userLoggedIn', 'locale', 'token'],
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
			}
		},

    methods: {
      	requestMovies(filters) {
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

			console.log("query =>", query)
			console.log('params =>', searchParams)

			const token = axios.defaults.headers.common['Authorization']
			delete axios.defaults.headers.common['Authorization']
			HTTP.get(query, { params: searchParams } ).then(result => {
				console.log(result)
				if (result.data.total_results == 0) {
					this.notFound = true
					this.totalPages = 1
					return false
				}
				for (var i = 0; i < result.data.results.length; i++) {
					for(var key in result.data.results[i]) {
						if (key == 'poster_path') {
							if (result.data.results[i][key] == null) {
								result.data.results[i][key] = 'https://images.pexels.com/photos/1612462/pexels-photo-1612462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
							} else {
								result.data.results[i][key] = 'http://image.tmdb.org/t/p/w500' + result.data.results[i][key]
							}
						}
					}
					this.movies.push(result.data.results[i])
				}
				this.totalPages = result.data.total_pages
			}).catch((e) => { console.log('e', e) })
			setAuthorizationToken(token)
      	},

      	showMore () {
			if (this.page + 1 < this.totalPages)
				this.page = this.page + 1;
			else
				this.page = this.totalPages;
			this.requestMovies(Object.keys(this.userParams).length)
      	},

		searchMovies(searchConditions) {
			const { fromDate, toDate, searchText, sort, genre } = searchConditions
			let searchParams = {
				"release_date.gte": fromDate,
				"release_date.lte": toDate,
			}
			if (genre)
				searchParams.with_genres = genre
			if (sort)
				searchParams.sort_by = sort
			this.searchText = searchText.length ? searchText : ''
			this.movies = []
			this.page = 1
			this.userParams = Object.assign({}, this.defaultParams)
			this.userParams = Object.assign(this.userParams, searchParams)
			this.requestMovies(true)
		},



    },
    mounted () {
        this.requestMovies(false)
    },
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
