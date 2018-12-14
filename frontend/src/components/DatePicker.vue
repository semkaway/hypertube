<template>
    <div class='date-wrapper'>
        <v-menu color="blue-grey lighten-1" ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y max-width="290px">
            <v-text-field color="blue-grey lighten-1" slot="activator" v-model="date.slice(0,4)" :label="label" readonly class='input-wrapper'></v-text-field>
            <v-date-picker color="blue-grey lighten-1" dark no-title ref="picker" v-model="date" :max="new Date().toISOString().substr(0, 10)" min="1900-01-01" reactive @input="save"></v-date-picker>
        </v-menu>
    </div>
</template>

<script>

    export default {
        name: 'DatePicker',
        props: ['label', 'startDate'],
        data() {
            return {
                date: this.startDate + '-01-11',
		        menu: false
            }
        },

        methods: {
            save (date) {
                this.$refs.menu.save(date);
                this.$refs.picker.activePicker = 'YEAR'
                this.menu = false
                this.$emit('changeDate', date.slice(0, 4))
		    }
        },

        watch: {
    	    menu (val) {
      		    val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    	    }
        },
    }

</script>


<style scoped>

    .date-wrapper {
        width: 50px;
		min-width: 50px;
        margin-top: 32px;
    }

	.input-wrapper {
		width: 42px;
		max-width: 42px;
	}

</style>
