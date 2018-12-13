export default function setDefaultPosterPath(movies) {
  if (movies.length !== undefined) {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].poster_path == null) {
        movies[i].poster_path = 'https://images.pexels.com/photos/1612462/pexels-photo-1612462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      } else {
        movies[i].poster_path = `http://image.tmdb.org/t/p/w500${movies[i].poster_path}`
      }
    }
  } else {
    if (movies.poster_path == null) {
      movies.poster_path = 'https://images.pexels.com/photos/1612462/pexels-photo-1612462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    } else {
      movies.poster_path = `http://image.tmdb.org/t/p/original${movies.poster_path}`
    }
  }

}
