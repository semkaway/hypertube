<template>
    <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="movie in movies" :key="movie.id" class="movie" lg3>
            <router-link :to="'/movies/'+movie.id">
              <v-hover>
               <v-card
                 slot-scope="{ hover }"
                 class="mx-auto"
                 color="grey lighten-4"
                 max-width="250"
               >
                 <v-img
                   :aspect-ratio="1/1.5"
                   :src="'http://image.tmdb.org/t/p/w300/'+movie.poster_path"
                 >
                   <v-expand-transition>
                       <div
                       v-if="hover"
                       class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal subheading white--text"
                       style="height: 100%; opacity: 0.9;"
                     >
                     <v-layout row wrap>
                        <v-flex xs12>
                          <p>{{movie.release_date}} IMDB {{movie.vote_average}}</p>
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

    export default {
        name: 'Movies',
        data () {
          return {
            movies: [],
            page: 1,
          }
        },
        mounted() {
          HTTP
            .get('user/data/')
            .then(result => {
              if (result.data.success == true) {
                this.token = result.data.token
                this.requestMovies(1)
              } else if (result.data.success == false) {
                localStorage.token = ''
                this.$router.push('/')
              }
            })
            .catch((err) => {
              console.log(err)
              this.token = ''
              localStorage.token = ''
              this.$router.push('/')
            })
        },
        methods: {
          requestMovies(page) {
            console.log(page)
            axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=09665afd54623c9413c3f9336484b01c&language=`
                          +localStorage.locale+'&append_to_response=images&include_image_language='+localStorage.locale+',null'+
                          '&page='+page)
            .then(result => {
              for (var i = 0; i < result.data.results.length; i++) {
                for(var key in result.data.results[i]) {
                    if (key == 'release_date') {
                      var year = result.data.results[i][key].split('-')
                      result.data.results[i][key] = year[0]
                    }
                  }
                this.movies.push(result.data.results[i])
              }
            })
          },
          handleScroll () {
            // console.log(this.page)
            var d = document.documentElement;
            var offset = d.scrollTop + window.innerHeight;
            var height = d.offsetHeight;

            if (offset === height) {
              this.page = this.page + 1;
              this.requestMovies(this.page)
              // console.log(this.page)
            }
          },
        },
        watch: {

        },
        created () {
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
