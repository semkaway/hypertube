<template>
    <div class="text-xs-center" v-if='run'>
        <v-dialog v-model="run" persistent content content-class="centered-dialog" width='92px'>
            <v-card color="white" dark>
                <v-card-text>
                    <self-building-square-spinner :animation-duration="1500" :size="64" color="#455A64" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {SelfBuildingSquareSpinner} from 'epic-spinners'

    export default {
        name: 'Loader',
        components: { SelfBuildingSquareSpinner },
        props: ['run']
    }

  </script>
