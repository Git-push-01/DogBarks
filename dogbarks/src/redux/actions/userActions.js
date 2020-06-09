
export const loginUser = (user) => {
  let data = {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/users/login`, data)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json(console.log(response));
      })

      .then((user) => {
        console.log(user.token, "user");
        sessionStorage.setItem("token", user.token);

        dispatch({
          type: "SET_USER",
          payload: user.token
        });
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
    fetch(`http://localhost:3000/api/v1/users/signup`, data)
      .then((response) => response.json())
      .then((user) => {
        sessionStorage.setItem("token", user.token);

        dispatch({
          type: "SET_USER",
          payload: user,
        });

        // callback()
      })
      .catch((err) => err);
  };
};
export const fetchUser = (id) => {
  let data = {
    method: "GET",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.token,

    },

  };

  return (dispatch) => {
   fetch(`http://localhost:3000/api/v1/users/:${id}`, data)
      .then((response) => response.json())
      .then((user) => {
        sessionStorage.setItem("user", user.email);
        console.log(user, "current user");
        dispatch({
          type: "SET_USER",
          payload: user
        });
      })
      .catch((err) => err);
  };
};

export const deleteUser = (id) => {
  let data = {
    method: "DELETE",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },


  };

  return dispatch => {
    fetch(`http://localhost:3000/api/v1/users/:${id}`, data)
      .then((response) => response.json())
      .then(user =>
        dispatch({
          type: "DELETE_USER",
          payload: user.id
        }))

      .catch((err) => err);
  };
};
