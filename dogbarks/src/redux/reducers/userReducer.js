const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {
  console.log(state, "user");
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "DELETE_USER":
      return {
        ...state,
        user: state.user.filter(
          (user) => user.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
