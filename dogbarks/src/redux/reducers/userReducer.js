const initialState = {
  currentUser: {}
}

export default function userReducer(state = initialState, action) {
  console.log(state, "user");
  switch(action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload }
      case 'DELETE_USER':
        return { ...state, currentUser: state.current.filter(current => current.id !== action.payload.id) }
    default: return state
  }
}
