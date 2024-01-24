const geoReducer = (state = [], action) => {
  switch (action.type) {
    case "GEO_LOC":
      return [...action.payload];

    case "GEO_ERR":
      return [...action.payload];
    default:
      return state;
  }
};

export default geoReducer;
