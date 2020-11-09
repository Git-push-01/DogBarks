import jwt_decode from 'jwt-decode'
export const loginUser = (user) => {
  let data = {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return   (dispatch) => {
       fetch(`http://localhost:3001/api/v1/users/login`, data)
       .then( async (response) => {
        if (!response.ok) throw new Error(response.status);
        else return  await response.json();
      })

       .then(async (user) => {
         const decoded = jwt_decode(user.token);


       await sessionStorage.setItem("token", user.token);

       dispatch("SET_USER"(decoded));

       console.log()


})

      .catch((err) => err);
  };
};

export const signupUser = (user) => {
  let data = {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`http://localhost:3001/api/v1/users/signup`, data)
      .then(async (response) => await response.json())
      .then(async (user) => {
      await  sessionStorage.setItem("token", user.token);

        dispatch({
          type: "SET_USER",
          payload: user,
        });

        // callback()
      })
      .catch(error => alert('Error! ' + error.message));
  };
};
// export const fetchUser = (id) => {
//   let data = {
//     method: "GET",
//     headers: {
//       'Accept': "application/json",
//       "Content-Type": "application/json",
//       "x-access-token": sessionStorage.token
//
//     },
//
//   };
//
//   return  (dispatch) => {
//    fetch(`http://localhost:3001/api/v1/users/${id}`, data)
//       .then(async (response) => await  response.json())
//       .then(async (user) => {
//       await  sessionStorage.setItem("user", user.email);
//
//         dispatch({
//           type: "SET_USER",
//           payload: user
//         });
//       })
//       .catch(error => alert('Error! ' + error.message))
//   };
// };

export const deleteUser = (id) => {
  let data = {
    method: "DELETE",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",

    },


  };

  return dispatch => {
    fetch(`http://localhost:3000/api/v1/users/${id}`, data)
      .then(async (response) => await response.json())
      .then( async (user) =>
         await dispatch({
          type: "DELETE_USER",
          payload: user.id,


        }))

      .catch((err) => err);
  };
};
