<template>
  <!-- <div>
		<h1>{{movie.title}}</h1>
    <b-img class="float-left ml-4" :src="'http://image.tmdb.org/t/p/w300/'+movie.poster_path"></b-img>
  </div> -->

</template>

<script>

import {HTTP} from '../http-common';
import axios from 'axios'

export default {
  name: 'Movie',
  data () {
    return {
        token: '',
        movie: []
      }
    },
    beforeCreate() {
      HTTP
        .get('movie/one/'+this.$route.params.id)
        .then(result => {
          // console.log(result.data.data)
          if (result.data.success == true) {
            // this.token = result.data.token
            // this.getMovieInfo()
            this.movie = result.data.data
          } else if (result.data.success == false) {
            // localStorage.token = ''
            // this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log(err)
          // this.token = ''
          // localStorage.token = ''
          // this.$router.push('/')
        })
    },
    methods: {
      // getMovieInfo() {
      //   axios.get(`https://api.themoviedb.org/3/movie/`+this.$route.params.id+`?api_key=09665afd54623c9413c3f9336484b01c&language=`
      //                 +localStorage.locale+'&append_to_response=images&include_image_language='+localStorage.locale+',null')
      //   .then(result => {
      //     console.log(result)
      //     // this.movies.push(result.data.results)
      //     // this.movies.forEach(console.log)
      //
      //   })
      // },
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
