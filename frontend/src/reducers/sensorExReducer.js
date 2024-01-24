const sensorReducer = ( state = [], action) => {
    switch (action.type) {
        case  "CREATE_SENSOR_EX":
            return { ...action.payload };
        default:
            return state;
    }
}

export default sensorReducer;