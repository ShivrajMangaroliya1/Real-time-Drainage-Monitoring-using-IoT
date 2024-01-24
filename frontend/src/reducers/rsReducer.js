const rsReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_RS":
      return { ...action.payload };
    case "REMOVE_RS":
      return [];
    case "GET_ALL_RS":
      return [...action.payload];
    default:
      return state;
  }
};

export default rsReducer;
