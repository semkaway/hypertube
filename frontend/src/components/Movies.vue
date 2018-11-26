<template>
    <div>
        <!-- <div class="panel">
            <label class="l" for="order">order</label>
            <select id="order" ref="order" @change="change()">
                <option value="trending">trending</option>
                <option value="rating">rating</option>
                <option value="year">year</option>
                <option value="title">title</option>
                <option value="last added">last added</option>
            </select>
            <label class="l" for="pages">page</label>
            <select id="pages" ref="pages" @change="change()">
                <option value="---">---</option>
            </select>
        </div>
        <div class="movies" id="movies" ref="movies">
        </div>
        <div id="popup" class="popup" v-on:click="close_popup($event)">
            <div style="background: aliceblue">
                <div class="panel">
                    <label class="l" for="lang">lang</label>
                    <select id="lang" ref="lang">
                        <option value="---">---</option>
                    </select>
                    <label class="l" for="size">size</label>
                    <select id="size" ref="size" @change="sizeChange">
                        <option value="---">---</option>
                    </select>
                    <span class="l">file</span><span class="l" style="color: green" ref="file">0</span>
                    <span class="l">seeds</span><span class="l" style="color: blue" ref="seeds">0</span>
                    <span class="l">peers</span><span class="l" style="color: red" ref="peers">0</span>
                </div>
                <div>
                    <span>Choose <strong>lang</strong>, <strong>size</strong> and click</span>
                    <button @click="apply">Apply</button>
                    <p></p>
                </div>
                <div>
                    <video width="640" height="360" controls ref="video">
                        <source id="source" src="" type="video/mp4">
                    </video>
                </div>
            </div>
        </div> -->
        <b-row class="mt-4">
          <b-col v-for="movie in movies" :key="movie.id" class="movie">
            <img :src="'http://image.tmdb.org/t/p/w185/'+movie.poster_path">
            <p>{{movie.title}}</p>
            <!-- <p class="description">{{movie.overview}}</p> -->
          </b-col>
        </b-row>
    </div>
</template>

<script>
    import {HTTP} from '../http-common';
    import axios from 'axios'

    export default {
        name: 'Movies',
        data() {
            return {
              movies: '',
              page: 1,
            }
        },
        mounted() {
          this.requestMovies(1)
        },
        methods: {
            requestMovies(page) {
              console.log(page)
              axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=09665afd54623c9413c3f9336484b01c&language=`
                            +localStorage.locale+'&append_to_response=images&include_image_language='+localStorage.locale+',null'+
                            '&page='+page)
              .then(result => {
                console.log(result)
                this.movies = result.data.results
                console.log(this.movies)
              })
            },
            apply() {
                const sizeIndex = this.$refs.size.options.selectedIndex;
                const langIndex = this.$refs.lang.options.selectedIndex;
                const size      = this.$refs.size.options[sizeIndex];
                const lang      = this.$refs.lang.options[langIndex];
                if (size.value !== '---' && lang.value !== '---') {
                    let data = JSON.parse(size.attributes.data.value);
                    this.$refs.video.pause();
                    document.getElementById('source').attributes.src.value =
                        "http://localhost:3000/api/stream/" + encodeURIComponent(data.url);
                    this.$refs.video.load();
                    this.$refs.video.play();
                }
            },
            close_popup(event) {
                let id = event.target.attributes.id;
                if (id !== undefined && id.value === 'popup') {
                    let source                 = document.getElementById('source');
                    this.$refs.lang.innerHTML  = '<option value="---">---</option>';
                    this.$refs.size.innerHTML  = '<option value="---">---</option>';
                    this.$refs.file.innerHTML  = 0;
                    this.$refs.peers.innerHTML = 0;
                    this.$refs.seeds.innerHTML = 0;
                    source.setAttribute('src', '');
                    this.$refs.video.load();
                    event.target.style.display = 'none';
                }
            },
            sizeChange() {
                const sizeIndex = this.$refs.size.options.selectedIndex;
                const size      = this.$refs.size.options[sizeIndex];
                if (size.value !== '---' && size.attributes.data !== undefined) {
                    let data                   = JSON.parse(size.attributes.data.value);
                    this.$refs.file.innerHTML  = data.filesize;
                    this.$refs.peers.innerHTML = data.peer;
                    this.$refs.seeds.innerHTML = data.seed;
                }
            },
            change() {
                this.$refs.movies.innerHTML = '';
                let orderIndex              = this.$refs.order.options.selectedIndex;
                let pageIndex               = this.$refs.pages.options.selectedIndex;
                if (this.$refs.pages.options[pageIndex].value !== '---') {
                    HTTP.get('movies/' + this.$refs.pages.options[pageIndex].value, {
                        params: {
                            sort: this.$refs.order.options[orderIndex].value
                        }
                    }).then(res => {
                        let movies = this.$refs.movies;
                        res.data.forEach(movie => {
                            let img = document.createElement('img');
                            let p   = document.createElement('p');
                            let div = document.createElement('div');
                            img.setAttribute('src', movie.images.poster);
                            img.setAttribute('width', '200px');
                            div.setAttribute('onclick', `
                                document.getElementById('popup').style.display = 'flex';
                                let torrents = ${JSON.stringify(movie.torrents)};
                                Object.keys(torrents).forEach(lang => {
                                    let langSelect = document.getElementById('lang');
                                    let option = document.createElement('option');
                                    option.innerHTML = lang;
                                    option.setAttribute('value', lang);
                                    langSelect.append(option);
                                    let sizes = torrents[lang];
                                    Object.keys(sizes).forEach(size => {
                                        let sizeSelect = document.getElementById('size');
                                        let option = document.createElement('option');
                                        option.innerHTML = size;
                                        option.setAttribute('value', size);
                                        let data = {
                                            filesize: sizes[size].filesize,
                                            peer: sizes[size].peer,
                                            seed: sizes[size].seed,
                                            url: sizes[size].url
                                        };
                                        option.setAttribute('data', JSON.stringify(data));
                                        sizeSelect.append(option);
                                    });
                                 });
                            `);
                            div.setAttribute('style', `
                                border: 1px solid;
                                padding: 0 8px;
                                margin: 5px 0;
                                display: flex;
                                flex-direction: column;
                            `);
                            div.setAttribute('onmouseover', "this.style.background='silver'");
                            div.setAttribute('onmouseout', "this.style.background='none'");
                            p.innerHTML = movie.title;
                            div.append(img);
                            div.append(p);
                            movies.append(div);
                        });
                    })
                        .catch(err => console.error(err));
                }
            },
            handleScroll () {
              console.log(this.page)
              var d = document.documentElement;
              var offset = d.scrollTop + window.innerHeight;
              var height = d.offsetHeight;

              if (offset === height) {
                this.page = this.page + 1;
                this.requestMovies(this.page)
                console.log(this.page)
              }
            }
        },
        watch: {

        },
        created () {
          window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
          window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style scoped>
    /* .panel {
        padding         : 10px;
        display         : flex;
        flex-direction  : row;
        align-content   : center;
        justify-content : center;
    }

    .l {
        padding     : 0 10px;
        font-family : sans-serif;
        font-weight : bold;
    }

    .movies {
        display         : flex;
        flex-wrap       : wrap;
        justify-content : space-evenly;
    }

    .popup {
        display         : none;
        flex-direction  : column;
        position        : fixed;
        align-items     : center;
        justify-content : center;
        z-index         : 6;
        background      : rgba(0, 0, 0, 0.4);
        width           : 100%;
        height          : 100%;
        top             : 0;
        left            : 0;
    } */

/* .movie {
  border: solid red 1px;
}

.movie:hover ~ .description{
    border: solid green 1px;
    display: block;

}

.description {
    display: none;
} */

</style>
