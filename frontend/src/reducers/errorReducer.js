const errorReducer = (state= [],action)=>{
    switch(action.type){
        case "GET_ERRORS":
            // console.log(action.payload)
            return [...action.payload]
        case "CLEAR_ERROR":
            return [...action.payload]
        default:
            return state;
    }
}


export default errorReducer;