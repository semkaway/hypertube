import axios from "axios";

const urls = (ids, locale) =>
    ids.map(id =>
        axios.get('https://api.themoviedb.org/3/movie/' + id, {
            params: {
                api_key: '09665afd54623c9413c3f9336484b01c',
                language: locale,
            }
        }));

export default (ids, locale) => axios.all(urls(ids, locale));
