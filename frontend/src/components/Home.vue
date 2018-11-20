<template>
  <div>
    <div v-if="token === ''">
      <b-row id="first-row" class="mx-1">
        <b-col></b-col>
        <b-col><h1 class="text-white align-middle">Hello hrere is some text to test my styling</h1></b-col>
        <b-col></b-col>
      </b-row>
      <b-row id="second-row">
        <b-col>
          <h1 class="text-dark">Hello hrere is some text to test my styling</h1>
        </b-col>
        <b-col>
          <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=40aeba3c68446f98649f5bf962faf5f0&auto=format&fit=crop&w=2840&q=80">
        </b-col>
      </b-row>
      <b-row id="third-row">
        <b-col>
          <img src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-0.3.5&s=190b7715b0eda47d2e3cb2c43c8ec9b1&auto=format&fit=crop&w=2851&q=80">
        </b-col>
        <b-col>
          <h1 class="text-dark">Hello hrere is some text to test my styling</h1>
        </b-col>
      </b-row>
      <b-row id="fourth-row">
        <!-- <b-col></b-col> -->
        <!-- <b-col> -->
        <b-carousel id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  background="#ababab"
                  :interval="4000"
                  img-width="1024"
                  v-model="slide"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                  class="mx-auto"
      >

        <b-carousel-slide caption="First slide"
                          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
          <h1>Hello world!</h1>
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58">
        </b-carousel-slide>

        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
               src="https://picsum.photos/1024/480/?image=55" alt="image slot">
        </b-carousel-slide>

      </b-carousel>
      <!-- </b-col> -->
      <!-- <b-col></b-col> -->
      </b-row>
    </div>
    <div v-else>
      <h1>Hello, user, from home page!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      slide: 0,
      sliding: null,
      token: localStorage.getItem('token')
    }
  },
  methods: {
    onSlideStart (slide) {
        this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
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
  height: 25rem;
  border: solid red;
}

#second-row {
  /* background-image: url("https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
	background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  height: 25rem;
  border: solid red;
}

#third-row {
  /* background-image: url("https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
	background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  height: 25rem;
  border: solid red;
}

#fourth-row {
  /* background-image: url("https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
	background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  /* min-height: 25rem; */
  height: 100%;
  border: solid red;
}

img {
  width: 35rem;
}

</style>
