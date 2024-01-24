const faultReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_FAULT":
      return { ...action.payload };
    case "DELETE_FAULT":
      return {
        ...state,
        allFault: state.allFault.filter((fault) => fault._id != action.payload),
      };
    default:
      return state;
  }
};

export default faultReducer;
