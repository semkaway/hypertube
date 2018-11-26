<template>
  <div>
    <div v-if="token === ''">
      <b-row id="first-row" class="mx-1">
        <b-col></b-col>
        <b-col><h1 class="text-white align-middle">Hello hrere is some text to test my styling</h1></b-col>
        <b-col></b-col>
      </b-row>
      <b-row id="second-row">
        <b-col>
          <h1 class="text-dark">Hello hrere is some text to test my styling</h1>
        </b-col>
        <b-col>
          <img class="landing-img" src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=40aeba3c68446f98649f5bf962faf5f0&auto=format&fit=crop&w=2840&q=80">
        </b-col>
      </b-row>
      <b-row id="third-row">
        <b-col>
          <img class="landing-img" src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-0.3.5&s=190b7715b0eda47d2e3cb2c43c8ec9b1&auto=format&fit=crop&w=2851&q=80">
        </b-col>
        <b-col>
          <h1 class="text-dark">Hello hrere is some text to test my styling</h1>
        </b-col>
      </b-row>
      <b-row id="fourth-row">

        <b-carousel id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  background="#ababab"
                  :interval="4000"
                  img-width="1024"
                  v-model="slide"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                  class="mx-auto"
      >

        <b-carousel-slide caption="First slide"
                          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                          img-src="https://picsum.photos/1024/480/?image=52"
                          class="landing-img"
        ></b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"
        class="landing-img">
          <h1>Hello world!</h1>
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58" class="landing-img">

        </b-carousel-slide>

        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100 landing-img" width="1024" height="480"
               src="https://picsum.photos/1024/480/?image=55" alt="image slot">
        </b-carousel-slide>

      </b-carousel>
      </b-row>
    </div>
    <div v-else>
      <b-row class="mt-4">
        <b-col v-for="movie in movies" :key="movie.id" class="movie">
          <img :src="'http://image.tmdb.org/t/p/w185/'+movie.poster_path">
          <p>{{movie.title}}</p>
          <!-- <p class="description">{{movie.overview}}</p> -->
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../http-common';
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      slide: 0,
      sliding: null,
      token: localStorage.getItem('token'),
      movies: '',
      page: 1,
    }
  },
  mounted() {
    this.requestMovies(1)
  },
  methods: {
      requestMovies(page) {
        console.log(page)
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=09665afd54623c9413c3f9336484b01c&language=`
                      +localStorage.locale+'&append_to_response=images&include_image_language='+localStorage.locale+',null'+
                      '&page='+page)
        .then(result => {
          console.log(result)
          this.movies = result.data.results
          console.log(this.movies)
        })
      },
      handleScroll () {
        console.log(this.page)
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;

        if (offset === height) {
          this.page = this.page + 1;
          this.requestMovies(this.page)
          console.log(this.page)
        }
      },
      onSlideStart (slide) {
          this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
      }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#first-row {
  /* background-image: url("https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4520a8fb1519f78738dbd64357638081&auto=format&fit=crop&w=2850&q=80"); */
  /* background-image: url("https://images.unsplash.com/photo-1513270483263-7a326f91265e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4cc26eb407cc5d1cd82b83d24d51ecfe&auto=format&fit=crop&w=2850&q=80"); */
  background-image: url("https://images.unsplash.com/photo-1504587614488-3259c5c1d9b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7aa9d6f4ba64dfeb28ddb06af263dfa9&auto=format&fit=crop&w=1268&q=80");
  ackground-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 25rem;
  border: solid red;
}

#second-row, #third-row, #fourth-row {
  height: 25rem;
  border: solid red;
}

.landing-img {
  width: 35rem;
}

</style>
