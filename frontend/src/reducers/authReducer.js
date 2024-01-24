const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { ...state, ...action.payload };
    case "SIGN_IN":
      return { ...state, ...action.payload };
    case "SIGN_OUT":
      return { ...action.payload };
    case "CURRENT_USER":
      return { ...action.payload };
    case "CLEAN_USER":
      return {};
    case "ERROR":
      return { err: [...action.payload] };
    default:
      return state;
  }
};

export default authReducer;
