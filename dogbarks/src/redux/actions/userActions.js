// const baseUrl = 'http://localhost:3000/api/v1/users'
const axios = require('axios')
export const loginUser = (user, callback) => {
  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  }

  return dispatch => {
  return  axios.post("http://localhost:3000/api/v1/users/login", data)
      .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.json();
  })
      .then(user => {
        sessionStorage.setItem('jwt', user.jwt)

        dispatch({
          type: 'SET_USER',
          payload: user.current
        })

        callback()
      })
      .catch((error) => alert('Invalid Email or Password'));


  }
}

export const signupUser = (user, callback) => {
  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  }

  return dispatch => {
    return axios.post("http://localhost:3000/api/v1/users/signup", data)
      .then(response => response.json())
      .then(user => {
        sessionStorage.setItem('jwt', user.jwt)

        dispatch({
          type: 'SET_USER',
          payload: user.current
        })

        callback()
      })
      .catch(err => err)
  }
}



export const deleteUser = id => {
  let data = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  return dispatch => {
    return axios.delete("http://localhost:3000/api/v1/users/me", data)
      .then(response => response.json())
      .then(user => dispatch({
        type: 'DELETE_USER',
        payload: user
      }))
      .catch(err => err)
  }
}
