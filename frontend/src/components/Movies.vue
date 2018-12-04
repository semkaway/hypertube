<template>
    <div>
    <v-container grid-list-md text-xs-center class="mt-5">
      <v-text-field
        class="mx-3 mt-5"
        v-model="searchParams"
        flat
        label="Search"
        append-icon="search"
        @keyup.native.enter="searchMovies"
      ></v-text-field>
      <v-layout row wrap class="mt-3">
        <v-flex v-for="movie in movies" :key='movie.id' class="movie" lg3>
            <router-link :to="'/movies/'+movie.id">
              <v-hover>
               <v-card
                 slot-scope="{ hover }"
                 class="mx-auto"
                 color="grey lighten-4"
                 max-width="250"
               >
                 <v-img :aspect-ratio="1/1.5" :src="movie.poster_path">
                   <v-expand-transition>
                    <div
						v-if="hover"
						class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal subheading white--text"
						style="height: 100%; opacity: 0.9;">
                     <v-layout row wrap>
                        <v-flex xs12>
                        	<p><v-icon v-html="'$vuetify.icons.calendar_today'"></v-icon>{{movie.release_date}} IMDB {{movie.vote_average}}</p>
                        </v-flex>
                        <v-flex class="mx-2" xs12>
                        	<p style="width:100%;overflow:hidden;height:150px;line-height:20px;">{{movie.overview}}</p>
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
    </div>
</template>

<script>
    import {HTTP} from '../http-common';
    import axios from 'axios'
	import setAuthorizationToken from '../utils/setAuthToken'

    export default {
        name: 'Movies',
        props: ['user', 'userLoggedIn', 'locale', 'token'],
        data () {
          return {
            movies: [],
            page: 1,
            searchParams: '',
            query: `https://api.themoviedb.org/3/movie/popular?api_key=09665afd54623c9413c3f9336484b01c&language=`
			+localStorage.locale+'&append_to_response=images&include_image_language='+localStorage.locale+',null&page='
          }
        },
        methods: {
			requestMovies() {
				console.log('this.query + this.page =>', this.query + this.page)
				HTTP.get(this.query + this.page).then(result => {
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
								result.data.results[i][key] = 'http://image.tmdb.org/t/p/w300/'+result.data.results[i][key]
							}
						}
					}
					this.movies.push(result.data.results[i])
				}
				}).catch((e) => {
					console.log('e', e)
				})
          },

          	handleScroll () {
            	let d = document.documentElement;
            	let offset = d.scrollTop + window.innerHeight;
            	let height = d.scrollHeight;

            	if (offset === height) {
              		this.page = this.page + 1;
              		this.requestMovies()
            	}
          	},

			searchMovies() {
				console.log(this.searchParams)
				this.query = `https://api.themoviedb.org/3/search/movie?api_key=09665afd54623c9413c3f9336484b01c&language=`
							+ localStorage.locale + '&query='+this.searchParams + '&images&include_image_language=' + localStorage.locale + ',null' +
							'&page='
				this.movies = []
				this.page = 1
				this.requestMovies()
			}
        },

        created () {
        	this.requestMovies()
          	window.addEventListener('scroll', this.handleScroll);
        },

        destroyed () {
          window.removeEventListener('scroll', this.handleScroll);
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
