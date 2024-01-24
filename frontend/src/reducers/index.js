import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import geoReducer from "./geoReducer";
import rsReducer from "./rsReducer";
import sensorReducer from "./sensorReducer";
import faultReducer from "./faultReducer";
import sensorExReducer from "./sensorExReducer";

const reducers = combineReducers({
  form: formReducer,
  currentUser: authReducer,
  errors: errorReducer,
  geo: geoReducer,
  rs: rsReducer,
  sensor: sensorReducer,
  fault: faultReducer,
  sensorEx: sensorExReducer,
});

export default reducers;
