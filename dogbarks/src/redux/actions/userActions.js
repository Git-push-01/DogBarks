
export const loginUser = (user) => {


  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(user)
  }

  return  dispatch => {
     fetch(`http://localhost:3000/api/v1/users/login`, data)
       .then(( response) => { if(!response.ok) throw new Error(response.status);
    else return response.json(console.log(response));

  })
         .then(user => {
         console.log(user.token,"user");
        sessionStorage.setItem('token', user.token)


        dispatch({
          type: 'SET_USER',
          payload: user
        })


      })
      .catch(err => err)


  }
}

export const signupUser = (user) => {
  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( user )
  }

  return dispatch => {
     fetch(`http://localhost:3000/api/v1/users/signup`, data)
      .then(response => response.json())
      .then(user => {
        sessionStorage.setItem('token', user.token)

        dispatch({
          type: 'SET_USER',
          payload: user.current
        })

        // callback()
      })
      .catch(err => err)
  }
}



export const deleteUser = id => {
let token = JSON.parse(sessionStorage.getItem('token'));
  let data = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }

  return dispatch => {
      fetch(`http://localhost:3000/api/v1/users/${ id }`, data)
      .then(response => response.json())
      .then(user => dispatch({
        type: 'DELETE_USER',
        payload: user
      }))
      .catch(err => err)
  }
}
