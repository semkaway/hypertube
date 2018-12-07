<template>
  <v-list three-line>
    <v-text-field
            v-model="newComment"
            :label="$t('movie.newComment')"
            type="text"
            append-outer-icon="send"
            @click:append-outer="submitComment"
            @keyup.native.enter="submitComment"
          >
        </v-text-field>
        <template v-for="(comment,index) in allComments" v-if="index <= numComments">
          <v-list-tile>
            <v-list-tile-avatar size="55"
                                class="actorPicture mr-2"
                                :style="{ 'background-image':'url('+comment.image + ')'}">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title><a :href="'profile/'+comment.user_id" target="_blank">{{comment.first}}</a></v-list-tile-title>
                <v-list-tile-sub-title>{{comment.text}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-btn v-if="numComments + 1 < totalNumberOfComments" @click.prevent="showMore" color="grey" class="white--text">{{$t('button.showMore')}}</v-btn>
  </v-list>
</template>

<script>


export default {
    name: 'Comments',
    data () {
      return {
        newComment: '',
        numComments: 4,
        moreComments: false,
        total: ''
      }
    },
    methods: {
      submitComment() {
        if(this.newComment != '') {
              this.$emit('submit-comment', this.newComment);
              this.newComment = '';
          }
          console.log('numComments: ', this.numComments)
          console.log('totalNumberOfComments: ', this.totalNumberOfComments)
        },
        showMore() {
          if (this.numComments + 5 < this.totalNumberOfComments) {
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
