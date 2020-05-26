const initialState = {
  current: {},
};

export default function userReducer(state = initialState, action) {
  console.log(state, "user");
  switch (action.type) {
    case "SET_USER":
      return { ...state, current: action.payload };
    case "DELETE_USER":
      return {
        ...state,
        current: state.current.filter(
          (current) => current.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
