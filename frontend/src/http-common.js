import axios from 'axios';

//TEST

export const HTTP = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})

//POTENTIALLY CORRECT

// export const HTTP = axios.create({
//   baseURL: `http://localhost:3000/`,
//   headers: {
//     Authorization: '{token}'
//   }
// })