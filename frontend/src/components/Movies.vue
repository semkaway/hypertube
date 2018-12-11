<template>
  <v-container v-if='userLoggedIn == true' grid-list-md text-xs-center class="mt-5">
      <v-flex lg12>

	  
        <v-text-field
          class="mx-3 mt-5"
          v-model="searchParams"
          flat
          :label="$t('movies.search')"
          append-outer-icon="search"
          @keyup.native.enter="searchMovies"
          @click:append-outer="searchMovies"
        ></v-text-field>
		<v-btn @click='test'>search</v-btn>

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
                            	<p><v-icon color="white">calendar_today</v-icon> {{movie.release_date}}</p>
                            </v-flex>
                            <v-flex xs12>
                            	<p>IMDB {{movie.vote_average}}</p>
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
	import { HTTP } from '../http-common'
	import * as constants from '../utils/constants'
    import setAuthorizationToken from '../utils/setAuthToken'

  export default {
    name: 'Movies',
	components: { NotFound },
    props: ['user', 'userLoggedIn', 'locale', 'token'],
    data () {
      return {
        movies: [],
        page: 1,
        searchParams: '',
        query: `https://api.themoviedb.org/3/movie/popular?api_key=${constants.API_KEY}&language=${this.locale}&append_to_response=images&include_image_language=${this.locale},null&page=`,
        totalPages: 1,
        notFound: false,
		
      }
    },
    methods: {
      	requestMovies() {
			HTTP.get(this.query + this.page).then(result => {
			console.log(result)
				if (result.data.total_results == 0) {
					this.notFound = true
					this.totalPages = 1
					return false
				}
				for (var i = 0; i < result.data.results.length; i++) {
					for(var key in result.data.results[i]) {
					if (key == 'release_date') {
						var year = result.data.results[i][key].split('-')
						result.data.results[i][key] = year[0]
					}
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
      	},

      	showMore () {
			if (this.page + 1 < this.totalPages)
			this.page = this.page + 1;
			else
			this.page = this.totalPages;
			this.requestMovies()
      	},

		searchMovies() {
			console.log(this.searchParams)
			if (this.searchParams !== '') {
				this.query = `https://api.themoviedb.org/3/search/movie?api_key=${constants.API_KEY}&language=${this.locale}&query=${this.searchParams}&images&include_image_language=${this.locale},null&page=`
				this.movies = []
				this.page = 1
				this.requestMovies()
			}
		},

		test() {
			delete axios.defaults.headers.common['Authorization']

			HTTP.get(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${constants.API_KEY}`).then(response => {
				console.log('response =>', response)
			}).catch(error => {
				console.log('error =>', error)
			})

			setAuthorizationToken(this.token)
		}


    },
    mounted () {
        this.requestMovies()
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
