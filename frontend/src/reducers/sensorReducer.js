const sensorReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_SENSOR":
      return { ...action.payload };
    case "REMOVE_SENSOR":
      return [];
    case "GET_ALL_SENSOR":
      return [...action.payload];
    default:
      return state;
  }
};

export default sensorReducer;
