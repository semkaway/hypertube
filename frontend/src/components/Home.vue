<template>
   <div style='height: 100%;'>
    <v-parallax
       src="https://images.pexels.com/photos/567985/pexels-photo-567985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
     >
       <v-layout
         align-center
         column
         justify-center
       >
         <div style="font-size: 5rem;" class="font-weight-light mb-3">Hypertube</div>
         <div style="font-size: 2rem;" >Get comfortable. It's time to watch a movie.</div>
       </v-layout>
     </v-parallax>
     <v-layout row wrap class="mt-5" style="background-color: white;">
       <v-flex xs12 sm12 md4 lg4 class="p-2 text-xs-center">
         <v-card class="elevation-0 transparent p-2 text-xs-center">
   				<v-card-title primary-title class="justify-center">
   					<div class="text-uppercase" style="font-size: 1.3rem;">
              <v-icon size="33" class="mr-3" color='blue-grey darken-1' style="vertical-align: middle;">fas fa-film</v-icon>
              {{$t('home.title1')}}
            </div>
   				</v-card-title>
   				<v-card-text class="text-xs-center">
   					<div class="subheading p-2">{{$t('home.quality')}}</div>
   					<div class="subheading p-2">{{$t('home.language')}}</div>
   					<div class="subheading p-2">{{$t('home.subtitles')}}</div>
   				</v-card-text>
   			</v-card>
       </v-flex>
       <v-flex xs12 sm12 md4 lg4 class="p-2 text-xs-center">
         <v-card class="elevation-0 transparent p-2 text-xs-center">
           <v-card-title primary-title class="justify-center">
   					<div class="text-uppercase" style="font-size: 1.3rem;">
              <v-icon size="33" class="mr-3" color='blue-grey darken-1' style="vertical-align: middle;">far fa-lightbulb</v-icon>
              {{$t('home.title2')}}
            </div>
   				</v-card-title>
   				<v-card-text class="text-xs-center">
   					<div>
   						<v-icon size="35" class="mr-3" color='green darken-1'>fab fa-vuejs</v-icon>
   						<span class='subheading mr-3'>VUE.js</span>
              <v-icon size="35" class="mr-3" color='light-blue darken-2'>color_lens</v-icon>
   						<span class="subheading">Material Design</span>
   					</div>
   					<div class='mt-3'>
   						<v-icon size="35" class="mr-3" color='green darken-3'>fab fa-node-js</v-icon>
   						<span class='subheading mr-3'>Node.js</span>
   						<v-icon size="35" class="mr-3" color='red darken-1'>fas fa-database</v-icon>
   						<span class="subheading">MongoDB</span>
   					</div>
          </v-card-text>
        </v-card>
       </v-flex>
       <v-flex xs12 sm12 md4 lg4 class="p-2">
         <v-card class="elevation-0 transparent p-2 text-xs-center">
   				<v-card-title primary-title class="justify-center">
   				<div class="text-uppercase" style="font-size: 1.3rem;">
            <v-icon size="33" class="mr-3" color='blue-grey darken-1' style="vertical-align: middle;">fas fa-globe</v-icon>
            {{$t('home.title3')}}
          </div>
   				</v-card-title>
          <v-card-text class="text-xs-center">
   						<div class='subheading'>{{$t('home.sources')}}   <span class='ml-1'><a href='https://github.com/semkaway/hypertube' target="_blank">hypertube</a></span></div>
   						<div class='subheading mt-3'>{{$t('home.contributor')}}   <span class='ml-1'><a href='https://github.com/semkaway' target="_blank">Kvilna</a></span>
   						<span class='ml-1'><a href='https://github.com/vliubko' target="_blank">Vliubko</a></span>
   						<span class='ml-1'><a href='https://github.com/pkolomiy' target="_blank">Pkolomiy</a></span>
   						<span class='ml-1'><a href='https://github.com/vtolochk' target="_blank">Vtolochk</a></span></div>
          </v-card-text>
   			</v-card>
       </v-flex>
     </v-layout>
  </div>
  <!-- <div style='height: 100%;' class='home-wrapper'>
		<div class='section pt-5 top-wrapper'>
			<v-card class="elevation-0 transparent">
				<v-card-title primary-title class="layout justify-center pb-1 pt-second-handler">
					<v-icon x-large class="black--text text--lighten-2 mr-3" color='blue-grey darken-1'>fas fa-film</v-icon>
					<div class="head-wrapper headline text-xs-center font-weight-medium text-uppercase">{{$t('home.title1')}}</div>
				</v-card-title>
				<div class='center font-weight-regular headline mt-2'>
					<div class='content-wrapper'>{{$t('home.quality')}}</div>
					<div class='content-wrapper'>{{$t('home.language')}}</div>
					<div class='content-wrapper'>{{$t('home.subtitles')}}</div>
				</div>
			</v-card>
		</div>

		<div class='section'>
			<v-card class="elevation-0 transparent">

				<v-card-title primary-title class="layout justify-center pb-0 padding-top-handler">
					<v-icon x-large class="black--text text--lighten-2 mr-3" color='blue-grey darken-1'>far fa-lightbulb</v-icon>
					<div class=" head-wrapper headline text-xs-center font-weight-medium text-uppercase" >{{$t('home.title2')}}</div>
				</v-card-title>
				<v-card-text class="text-xs-center">

				<div class='center'>
					<div class='start font-weight-regular headline'>
					<div class='content-wrapper mt-3'>
						<v-icon  medium class="black--text text--lighten-2 mr-3" color='green darken-1'>fab fa-vuejs</v-icon>
						<span>VUE.js</span>
					</div>
					<div class='content-wrapper mt-3'>
						<v-icon medium class="black--text text--lighten-2 mr-3" color='light-blue darken-2'>color_lens</v-icon>
						<span>Material Design</span>
					</div>
					<div class='content-wrapper mt-3'>
						<v-icon medium class="black--text text--lighten-2 mr-3" color='green darken-3'>fab fa-node-js</v-icon>
						<span>Node.js</span>
					</div>
					<div class='content-wrapper mt-3'>
						<v-icon medium class="black--text text--lighten-2 mr-3" color='red darken-1'>fas fa-database</v-icon>
						<span>MongoDB</span>
					</div>
				</div>
				</div>

				</v-card-text>
			</v-card>
		</div>

		<div class='section'>
			<v-card class="elevation-0 transparent">
				<v-card-title primary-title class="layout justify-center pb-0 padding-top-handler">
				<v-icon x-large class="black--text text--lighten-2 mr-3" color='blue-grey darken-1'>fas fa-globe</v-icon>
				<div class="head-wrapper headline text-xs-center font-weight-medium text-uppercase">{{$t('home.title3')}}</div>
				</v-card-title>
				<div class='center mt-4'>
					<div class='start font-weight-regular headline'>
						<div class='content-wrapper'>{{$t('home.sources')}}   <span class='ml-1'><a href='https://github.com/semkaway/hypertube' target="_blank">hypertube</a></span></div>
						<div class='content-wrapper mt-3'>{{$t('home.contributor')}}   <span class='ml-1'><a href='https://github.com/semkaway' target="_blank">Kvilna</a></span></div>
						<div class='content-wrapper mt-3'>{{$t('home.contributor')}}   <span class='ml-1'><a href='https://github.com/vliubko' target="_blank">Vliubko</a></span></div>
						<div class='content-wrapper mt-3'>{{$t('home.contributor')}}   <span class='ml-1'><a href='https://github.com/pkolomiy' target="_blank">Pkolomiy</a></span></div>
						<div class='content-wrapper mt-3'>{{$t('home.contributor')}}  <span class='ml-1'><a href='https://github.com/vtolochk' target="_blank">Vtolochk</a></span></div>
					</div>
				</div>
			</v-card>
		</div>

  </div> -->
</template>

<script>

export default { name: 'Home' }

</script>

<style scoped>

 	/* * {
		box-sizing: border-box;
 	}

	.top-wrapper {
		margin-top: 50px;
	}

	.content-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 1%;
		letter-spacing: 1.5px;
	}

	.section {
		width: 100%;
		height: 30.7vh;
		box-sizing: border-box;
		box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
	}
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
	}

	.home-wrapper {
		width: 100%;
		height: 50%;
	}

	.start {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-flow: column;
	}

	@media only screen and (max-width: 600px), (max-height: 1100px) {
		.pt-second-handler {
			margin-top: 10px;
			padding-top: 10px !important;
			padding-right: 5px;
			padding-left: 5px;
		}

		.padding-top-handler {
			padding-top: 5px !important;
		}

		.head-wrapper {
			font-size: 13px !important;
		}

		.content-wrapper, .center {
			margin-top: 0px !important;
			padding: 0 !important;
		}

		.top-wrapper {
			margin-top: 0px !important;
		}


		.start, .center {
			letter-spacing: 1px !important;
			font-size: 10px !important;
		}
	} */



</style>
