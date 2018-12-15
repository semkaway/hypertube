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
         <div style="font-size: 2rem;">{{$t('home.subtitle')}}</div>
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
</template>

<script>

export default { name: 'Home' }

</script>
