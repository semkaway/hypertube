<template>
  <div v-if="totalNumberOfMovies != 0">
    <div class="m-2" style="font-size: 2rem;">{{title}}</div>
    <div style="position: relative">
        <v-container grid-list-md class="p-2">
          <v-layout wrap relative>
            <v-btn  class="hidden-sm-and-down"
                    v-if="startMoviesToShow != 0"
                    absolute
                    dark
                    fab
                    depressed
                    left
                    color="grey lighten-2"
                    style="top: 45%; opacity: 0.8; outline: none;"
                    @click.prevent="showPrevious"
                >
                  <v-icon color="black">keyboard_arrow_left</v-icon>
                </v-btn>
            <v-flex v-for="(movie,index) in movies"
                    v-if="index >= startMoviesToShow && index < endMoviesToShow"
                    :key="index"
                    xs12 sm6 md3 lg3>
              <router-link :to="'/movies/'+movie.id">
                <v-img  :aspect-ratio="1/1.5"
                        max-width="100%"
                        :src="movie.poster_path"
                        >
                          <v-layout slot="placeholder"
                                    fill-height
                                    align-center
                                    justify-center
                                    ma-0
                                    >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                          </v-layout>
                </v-img>
              </router-link>
            </v-flex>
            <v-btn  class="hidden-sm-and-down"
                    v-if="endMoviesToShow < totalNumberOfMovies"
                    absolute
                    dark
                    fab
                    depressed
                    right
                    color="grey lighten-2"
                    style="top: 45%; opacity: 0.8; outline: none;"
                    @click.prevent="showNext"
                >
                  <v-icon color="black">keyboard_arrow_right</v-icon>
                </v-btn>
          </v-layout>
        </v-container>
        <div class="text-xs-center hidden-md-and-up">
        <v-btn  v-if="endMoviesToShow < totalNumberOfMovies"
                @click.prevent="addMore"
                color="blue-grey lighten-1"
                dark
                style="outline: none;"
                class="white--text mt-3">{{$t('button.showMore')}}</v-btn>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: 'listOfMovies',
	props: ['movies', 'totalNumberOfMovies', 'title'],
    data () {
      return {
        startMoviesToShow: 0,
        showMoviesOnPage: 4,
        endMoviesToShow: 4
      }
    },
    methods: {

        showPrevious() {
			if (this.endMoviesToShow == this.totalNumberOfMovies && this.totalNumberOfMovies % this.showMoviesOnPage !== 0)
					this.endMoviesToShow -= this.totalNumberOfMovies % this.showMoviesOnPage
			else
					this.endMoviesToShow -= this.showMoviesOnPage
			this.startMoviesToShow -= this.showMoviesOnPage
        },

        showNext() {
			if (this.endMoviesToShow + this.showMoviesOnPage > this.totalNumberOfMovies)
					this.endMoviesToShow = this.totalNumberOfMovies
			else
					this.endMoviesToShow += this.showMoviesOnPage
			this.startMoviesToShow += this.showMoviesOnPage
        },

        addMore() {
			if (this.endMoviesToShow + this.showMoviesOnPage > this.totalNumberOfMovies)
				this.endMoviesToShow = this.totalNumberOfMovies
			else
				this.endMoviesToShow += this.showMoviesOnPage
        }
    },
}

</script>

<style scoped>

	a {
		text-decoration: none;
	}

</style>
