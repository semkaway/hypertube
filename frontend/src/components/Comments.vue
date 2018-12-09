<template>
  <v-flex xs12>
    <v-text-field class="mt-4"
                v-model.trim="newComment"
                :label="$t('movie.newComment')"
                type="text"
                append-outer-icon="send"
                @click:append-outer="submitComment"
                @keyup.native.enter="submitComment">
        </v-text-field>
    <v-card v-for="(comment,index) in allComments"
            v-if="index <= numComments"
            :key="index"
            class="mt-3 p-2 pl-3"
            flat>
      <v-layout>
        <v-flex xs1 class="mr-3">
          <v-img  class='rounded round-img'
                  :aspect-ratio="16/9"
                  height='65px'
                  width='65px'
                  :src="comment.image">
          </v-img>
        </v-flex>
        <v-flex xs11>
          <div>
            <a :href="'profile/'+comment.user_id" target="_blank" class="mr-2 font-weight-black">{{comment.first}}</a>
            <span class="caption">{{comment.date | date}}</span>
            <div>{{comment.text}}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-btn  v-if="numComments + 1 < totalNumberOfComments"
            @click.prevent="showMore"
            color="grey"
            class="white--text mt-3">{{$t('button.showMore')}}</v-btn>
  </v-flex>
</template>

<script>

import formatDate from '../utils/formatDate'

export default {
    name: 'Comments',
    filters: {
      date: formatDate
    },
    data () {
      return {
        newComment: '',
        numComments: 4,
        moreComments: false
      }
    },
    methods: {
      submitComment() {
        if(this.newComment !== '') {
              this.$emit('submit-comment', this.newComment);
              this.newComment = '';
          }
          console.log('numComments: ', this.numComments)
          console.log('totalNumberOfComments: ', this.totalNumberOfComments)
        },
        showMore() {
          console.log('this.numComments: ', this.numComments)
          console.log('this.totalNumberOfComments: ', this.totalNumberOfComments)
          if (this.numComments + 5 <= this.totalNumberOfComments) {
            this.numComments += 5
          } else if (this.numComments + 5 > this.totalNumberOfComments) {
            this.numComments = this.totalNumberOfComments
            this.moreComments = false
          }
        }
    },
    props: ['allComments', 'totalNumberOfComments']
}

</script>

<style scoped>

a {
  text-decoration: none;
}

</style>
