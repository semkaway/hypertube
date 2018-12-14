<template>
  <v-layout row wrap align-center justify-center>

	<div class='item-wrapper'>
			<v-overflow-btn color="blue-grey lighten-1" v-model='genre' :items=" dropdown_genres" hide-details class="pa-0" >
			</v-overflow-btn>
	</div>

	<div class='item-wrapper'>
		<v-overflow-btn color="blue-grey lighten-1" v-model='sortBy' :items=" dropdown_sorts" hide-details class="pa-0">
		</v-overflow-btn>
	</div>

	<div class='dates-wrapper'>
		<DatePicker v-on:changeDate='handleChangeFromDate' :label="this.$t('movies.since')" :startDate='searchAppParams["release_date.gte"]'/>
		<DatePicker v-on:changeDate='handleChangeToDate' :label="this.$t('movies.to')" :startDate='searchAppParams["release_date.lte"]'/>
	</div>

	<div class='search-input-wrapper'>
		<v-text-field color="blue-grey lighten-1" v-model='searchText'
			flat
		 	@keyup.native.enter="searchMovies"
			@click:append-outer="searchMovies"
			:label="$t('movies.search')">
		</v-text-field>
  	</div>

	<div class='search-button-wrapper'>
    <v-btn style="outline: none;"
    color="blue-grey lighten-1" large
    dark @click='searchMovies'>{{$t('movies.search')}}</v-btn>
	</div>

  </v-layout>
</template>


<script>
    import { GENRES } from '../utils/constants'
	import DatePicker from './DatePicker'

  export default {
    name: 'SearchBar',
	components: { DatePicker },
	props: ['searchAppText', 'searchAppParams'],
    data () {
      return {
		genre: '',
		sortBy: '',
		fromDate: this.searchAppParams["release_date.gte"],
		toDate: this.searchAppParams["release_date.lte"],
		searchText: this.searchAppText,
        dropdown_genres: [
          { text: this.$t('genres.action'),         id: GENRES[0].id},
          { text: this.$t('genres.adventure'),      id: GENRES[1].id},
          { text: this.$t('genres.animation'),      id: GENRES[2].id},
          { text: this.$t('genres.comedy'),         id: GENRES[3].id},
          { text: this.$t('genres.crime'),          id: GENRES[4].id},
          { text: this.$t('genres.documentary'),    id: GENRES[5].id},
          { text: this.$t('genres.drama'),          id: GENRES[6].id},
          { text: this.$t('genres.family'),         id: GENRES[7].id},
          { text: this.$t('genres.fantasy'),        id: GENRES[8].id},
          { text: this.$t('genres.history'),        id: GENRES[9].id},
          { text: this.$t('genres.horror'),         id: GENRES[10].id},
          { text: this.$t('genres.music'),          id: GENRES[11].id},
          { text: this.$t('genres.mystery'),        id: GENRES[12].id},
          { text: this.$t('genres.romance'),        id: GENRES[13].id},
          { text: this.$t('genres.scienceFiction'), id: GENRES[14].id},
          { text: this.$t('genres.tvMovie'),        id: GENRES[15].id},
          { text: this.$t('genres.thriller'), 		id: GENRES[16].id},
          { text: this.$t('genres.war'), 			id: GENRES[17].id},
          { text: this.$t('genres.western'), 		id: GENRES[18].id},
          { text: this.$t('movie.genres'), 			id: ''}
        ],
		dropdown_sorts: [
			{text: this.$t('movies.popularity'), 	param: 'popularity.desc'},
			{text: this.$t('movies.releaseDate'), 	param: 'release_date.desc'},
			{text: this.$t('movies.voteNumber'), 	param: 'vote_count.desc'},
			{text: this.$t('movies.rating'), 		param: 'vote_average.desc'},
			{text: this.$t('movies.filter'), 		param: ''},
		],
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3]
      }
    },

	methods: {
		searchMovies() {
			let genre = this.dropdown_genres.find(o => o.text === this.genre)
			let sort = this.dropdown_sorts.find(o => o.text === this.sortBy)
			genre = genre ? genre.id : ''
			sort = sort ? sort.param : ''
			this.$emit('searchMovies', { genre, sort, fromDate: parseInt(this.searchAppParams["release_date.gte"]), toDate: parseInt(this.searchAppParams["release_date.lte"]), searchText: this.searchText } )
		},

		handleChangeFromDate(date) {
			this.$emit('handleChangeFromDate', date)
		},

		handleChangeToDate(date) {
			this.$emit('handleChangeToDate', date)
		}

	},

	mounted () {
		if (this.searchAppParams.with_genres) {
			const genreName = this.dropdown_genres.find(obj => obj.id == this.searchAppParams.with_genres)
			this.genre = genreName.text
		} else {
			this.genre = this.$t('movie.genres')
		}
		if (this.searchAppParams.sort_by) {
			const sortByName = this.dropdown_sorts.find(obj => obj.param == this.searchAppParams.sort_by)
			this.sortBy = sortByName.text
		} else {
			this.sortBy = this.$t('movies.filter')
		}
	}

  }
</script>

<style scoped>

	.search-bar-wrapper {
		display: flex;
		flex-flow: row;
		align-items: center;
	}

	.dates-wrapper {
		display: flex;
		flex-flow: row;
		justify-content: flex-start;
		align-items: center;
		margin-right: 15px;
		margin-left: 15px;
	}

    .item-wrapper {
        width: 265px;
		min-width: 260px;
    }

	.search-input-wrapper {
		width: 265px;
		min-width: 260px;
		margin-top: 32px;
	}

	.search-button-wrapper {
		margin-top: 26px;
		margin-left: 15px;
	}

</style>
