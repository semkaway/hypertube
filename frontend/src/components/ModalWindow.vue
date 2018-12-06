<template>
  <v-layout row justify-center>
    <v-dialog v-model="showWindow" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{this.headText}}</v-card-title>
        <v-card-text>{{this.message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" class="white--text" flat @click="$emit('disagree')">{{this.disagreeText}}</v-btn>
          <v-btn color="red" class="white--text" flat @click="$emit('agree')">{{this.agreeText}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        name: 'ModalWindow',
        props: ['show', 'headerText', 'text', 'agreeButtonText', 'disagreeButtonText'],
        data() {
            return {
                showWindow: this.show,
                headText: this.headerText,
                message: this.text,
                agreeText: this.agreeButtonText,
                disagreeText: this.disagreeButtonText
            }
        },

        watch: {
            show(newValue) {
                this.showWindow = newValue
            },
            headerText(newValue) {
                this.headText = newValue
            },
            text(newValue) {
                this.message = newValue
            },
            agreeButtonText(newValue) {
                this.agreeText = newValue
            },
            disagreeButtonText(newValue) {
                this.disagreeText = newValue
            }
        }
    }
</script>