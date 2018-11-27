<template>
    <div>
      <b-row class="mt-4 mx-5">
        <b-col lg='1'></b-col>
        <b-col lg='10'>
          <b-row v-for="(items, index) in movies" :key="`items-${index}`">
            <b-col v-for="movie in items" :key="movie.id" class="movie">
                <router-link :to="'/movies/'+movie.id">
                  <b-img :src="'http://image.tmdb.org/t/p/w185/'+movie.poster_path">
                  </b-img>
                </router-link>
                <p>{{movie.title}}</p>
                <!-- <p class="description">{{movie.overview}}</p> -->
            </b-col>
          </b-row>
        </b-col>
        <b-col lg='1'></b-col>
      </b-row>
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
              console.log(result)
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
              console.log(result.data.results)
              this.movies.push(result.data.results)
              // this.movies.forEach(console.log)

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


</style>
