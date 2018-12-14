<template>
  <v-flex xs12>
    <v-text-field class="mt-4"
                color="#455A64"
                v-model.trim="newComment"
                :label="$t('movie.newComment')"
                type="text"
                append-outer-icon="send"
                :counter="1000"
                @click:append-outer="submitComment"
                @keyup.native.enter="submitComment">
        </v-text-field>
    <v-card v-for="(comment,index) in allComments"
            v-if="index <= numComments"
            :key="index"
            class="mt-3"
            flat>
      <v-layout>
        <v-avatar size="58" class="mr-2">
          <v-img  class='rounded round-img'
                  :aspect-ratio="16/9"
                  :src="comment.image">
          </v-img>
        </v-avatar>
        <div>
            <router-link :to="'/user/'+comment.user_id" class="mr-2 font-weight-black">{{comment.first}}</router-link>
            <span class="caption">{{comment.date | date}}</span>
            <div style="word-break: break-all;">{{comment.text}}</div>
        </div>
      </v-layout>
    </v-card>
    <div class="text-xs-center">
    <v-btn  v-if="numComments + 1 < totalNumberOfComments"
            @click.prevent="showMore"
            color="blue-grey darken-1"
            dark
            style="outline: none;">{{$t('button.showMore')}}</v-btn>
    </div>
  </v-flex>
</template>

<script>
import formatDate from '../utils/formatDate'

export default {
    name: 'Comments',
    filters: {
     	date: formatDate
    },
	props: ['allComments', 'totalNumberOfComments'],
    data () {
      	return {
			newComment: '',
			numComments: 4,
			moreComments: false
      	}
    },
    methods: {
      	submitComment() {
        	if(this.newComment !== '' && this.newComment.length <= 1000) {
            	this.$emit('submit-comment', this.newComment);
              	this.newComment = '';
          	}
        },

        showMore() {
			if (this.numComments + 5 <= this.totalNumberOfComments) {
				this.numComments += 5
			} else if (this.numComments + 5 > this.totalNumberOfComments) {
				this.numComments = this.totalNumberOfComments
				this.moreComments = false
			}
        }
    },
}

</script>

<style scoped>

	a {
		text-decoration: none;
		color: #455A64;
	}

</style>
