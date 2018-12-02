<template>
 <div class="mt-5">
    <v-container fluid grid-list-md class="mt-3">
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-card color="grey lighten-4" light>
          <v-img :src="movie.poster_path"></v-img>
          <v-list one-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>attach_money</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{movie.budget}}</v-list-tile-title>
              <v-list-tile-sub-title>Budget</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>access_time</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{movie.runtime}} min</v-list-tile-title>
              <v-list-tile-sub-title>Duration</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>


          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>star</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{movie.vote_average}}</v-list-tile-title>
              <v-list-tile-sub-title>Rating</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>drag_indicator</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{genres}}</v-list-tile-title>
              <v-list-tile-sub-title>Genres</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>date_range</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{movie.release_date}}</v-list-tile-title>
              <v-list-tile-sub-title>Year</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6>
      <v-card light flat class="p-2">
        <h1>{{movie.title}}</h1>
        <p class="subheading">{{movie.tagline}}</p>
        <v-card-text>{{movie.overview}}</v-card-text>
      </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-list two-line>
          <v-subheader>
              Crew
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
          <v-subheader>
              Cast
            </v-subheader>
          <template v-for="actor in this.actors">
            <v-list-tile>
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
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
  </div>

</template>

<script>

import {HTTP} from '../http-common';
import axios from 'axios'

export default {
  name: 'Movie',
  data () {
    return {
        token: '',
        movie: [],
        genres: '',
        actors: [],
        crew: []
      }
    },
    beforeCreate() {
      HTTP
        .get('movie/one/'+this.$route.params.id)
        .then(result => {
          if (result.data.success == true) {
              for(var key in result.data.data) {
                  if (key == 'genres') {
                    for (var i = 0; i < result.data.data[key].length; i++) {
                      this.genres += result.data.data[key][i].name+', '
                    }
                  }
                  if (key == 'poster_path') {
                    if (result.data.data[key] == null) {
                      result.data.data[key] = 'https://images.pexels.com/photos/1612462/pexels-photo-1612462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                    } else {
                      result.data.data[key] = 'http://image.tmdb.org/t/p/w300'+result.data.data[key]
                    }
                  }
                  if (key == 'release_date') {
                    result.data.data[key] = result.data.data[key].split('-')[0]
                  }
                  if (key == 'credits') {
                    for (var j = 0; j != 5; j++) {
                      this.actors.push(result.data.data[key].cast[j])
                    }
                    for (var k = 0; k < result.data.data[key].crew.length; k++) {
                      if (result.data.data[key].crew[k].job === 'Director' || result.data.data[key].crew[k].job === 'Producer') {
                        this.crew.push(result.data.data[key].crew[k])
                      }
                    }
                  }
                }
            this.movie = result.data.data
            console.log(this.movie)
            this.genres = this.genres.slice(0, this.genres.length-2)
          } else if (result.data.success == false) {

          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    methods: {
      }
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
}

</style>
