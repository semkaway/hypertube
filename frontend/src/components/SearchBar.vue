<template>
  <v-layout row wrap align-center>

	<div class='item-wrapper'>
		<v-overflow-btn v-model='genre' :items=" dropdown_genres" hide-details class="pa-0">
		</v-overflow-btn>
	</div>

	<div class='item-wrapper'>
		<v-overflow-btn v-model='sortBy' :items=" dropdown_sorts" hide-details class="pa-0">
		</v-overflow-btn>
	</div>

	<div class='dates-wrapper'>
		<DatePicker v-on:changeDate='handleChangeFromDate' label='от' startDate='1900'/>
		<DatePicker v-on:changeDate='handleChangeToDate' label='до' startDate='2018'/>
	</div>

	<div class='item-wrapper'>
		<v-text-field v-model='searchText' class="mx-3 mt-5 pa-0" flat :label="$t('movies.search')" append-outer-icon="search">
		</v-text-field>
  	</div>

	 <v-btn @click='test'>search</v-btn>
  
  </v-layout>
</template>


<script>
    import { GENRES } from '../utils/constants'
	import DatePicker from './DatePicker'

  export default {
    name: 'SearchBar',
	components: { DatePicker },
    data () {
      return {
		genre: this.$t('movie.genres'),
		sortBy: 'Фильтровать по',
		fromDate: 1900,
		toDate: 2018,
		searchText: '',
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
          { text: this.$t('genres.western'), 		id: GENRES[18].id}
        ],
		dropdown_sorts: [
			{text: 'Популярность'},
			{text: 'Дата выхода'},
			{text: 'Количество голосов'},
			{text: 'Оценка'},
		],
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3]
      }
    },

	methods: {
		test() {
			const genre = this.dropdown_genres.find(o => o.text === this.genre)
			const sort = this.dropdown_sorts.find(o => o.text === this.sortBy)
			

			console.log('genre ->', genre ? genre.text : 'all')
			console.log('sort ->', sort ? sort.text : 'all')
			console.log('from date ->', this.fromDate)
			console.log('to date ->', this.toDate)
			console.log('searchText ->', this.searchText)
		},

		handleChangeFromDate(date) {
			this.fromDate = date
		},

		handleChangeToDate(date) {
			this.toDate = date
		}

	},


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
	}

    .item-wrapper {
        width: 265px;
		min-width: 260px;
    }

</style>