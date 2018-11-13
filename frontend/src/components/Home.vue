<template>
  <div>
    <b-row id="first-row" class="mx-1">
      <b-col></b-col>
      <b-col><h1 class="text-white">Hello hrere is some text to test my styling</h1></b-col>
      <b-col></b-col>
    </b-row>
    <b-row id="second-row">
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
    <b-row id="third-row">
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
    <b-row id="fourth-row">
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#first-row {
  /* background-image: url("https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4520a8fb1519f78738dbd64357638081&auto=format&fit=crop&w=2850&q=80"); */
  /* background-image: url("https://images.unsplash.com/photo-1513270483263-7a326f91265e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4cc26eb407cc5d1cd82b83d24d51ecfe&auto=format&fit=crop&w=2850&q=80"); */
  background-image: url("https://images.unsplash.com/photo-1504587614488-3259c5c1d9b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7aa9d6f4ba64dfeb28ddb06af263dfa9&auto=format&fit=crop&w=1268&q=80");
  ackground-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 25vh;
}

#second-row {
  /* background-image: url("https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
	background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  height: 25vh;
}

#third-row {
  /* background-image: url("https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
	background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  height: 25vh;
}

#fourth-row {
  /* background-image: url("https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
	background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  height: 25vh;
}

</style>
