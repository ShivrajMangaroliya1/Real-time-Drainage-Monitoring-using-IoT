import { apiReq } from "../api/index";
import history from "../history/history";

export const SignUpAction = (formData) => {
  return async (dispatch, getState) => {
    const response = await apiReq.post("/auth/signup", {
      ...formData,
    });
    if (!response.data.username) {
      console.log(response.data);
      // return dispatch({ type: "ERROR", payload: response.data });
      return dispatch(ErrorAction(response.data));
    }
    dispatch({ type: "SIGN_UP", payload: response.data });
    //here need to navigate to the dashboard.....
    history.push("/admin/dashboard");
  };
};

export const SignInAction = (formData) => {
  console.log("runs");
  return async (dispatch, getState) => {
    const response = await apiReq.post("/auth/signin", {
      ...formData,
    });

    if (!response.data.username) {
      console.log("action in data", response.data);
      // return dispatch({ type: "ERROR", payload: response.data });
      return dispatch(ErrorAction(response.data));
    }
    dispatch({ type: "SIGN_IN", payload: response.data });
    history.push("/admin/dashboard");
  };
};

export const SignOutAction = () => {
  return async (dispatch, getState) => {
    const response = await apiReq.post("/auth/signout");
    dispatch({ type: "SIGN_OUT", payload: response.data });
    history.push("/");
  };
};

export const getCurrentUser = () => {
  return async (dispatch, getState) => {
    const response = await apiReq.get("/auth/currentuser");
    if (response.data.username) {
      dispatch({ type: "CURRENT_USER", payload: response.data });
    }
  };
};

export const ErrorAction = (data) => {
  return (dispatch) => {
    console.log(data);
    dispatch({ type: "GET_ERRORS", payload: data });
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_ERROR", payload: [] });
  };
};

export const getGeoLocation = () => {
  return async (dispatch, getState) => {
    window.navigator.geolocation.getCurrentPosition(
      (success) => {
        console.log(success.coords);
        dispatch({
          type: "GEO_LOC",
          payload: [success.coords.latitude, success.coords.longitude],
        });
      },
      (err) => {
        console.log(err);
        dispatch({ type: "GEO_ERR", payload: ["please enable geolocation "] });
      }
    );
  };
};

export const createRs = (data) => {
  return async (dispatch, getState) => {
    const response = await apiReq.post("/rs", {
      ...data,
    });
    if (!response.data.name) {
      console.log("action in data", response.data);
      // return dispatch({ type: "ERROR", payload: response.data });
      return dispatch(ErrorAction(response.data));
    }
    dispatch({ type: "CREATE_RS", payload: response.data });
    history.push("/rs-success");
  };
};

export const createSensor = (data) => {
  return async (dispatch, getState) => {
    const response = await apiReq.post("/sensor", {
      ...data,
    });
    if (!response.data.name) {
      console.log("action in data", response.data);
      // return dispatch({ type: "ERROR", payload: response.data });
      return dispatch(ErrorAction(response.data));
    }
    dispatch({ type: "CREATE_SENSOR_EX", payload: response.data });
    history.push("/sensor-success");
  };
};

export const getALLRs = () => {
  return async (dispatch, getState) => {
    const response = await apiReq.get("/rs");
    if (!response.data[0].name) {
      return dispatch(ErrorAction(response.data));
    }
    dispatch({ type: "GET_ALL_RS", payload: response.data });
  };
};

export const getAllSensor = () => {
  return async (dispatch, getState) => {
    const response = await apiReq.get("/sensor");
    if (!response.data[0].name) {
      return dispatch(ErrorAction(response.data));
    }
    dispatch({ type: "GET_ALL_SENSOR", payload: response.data });
  };
};

export const getAllFault = (pageNo = 1, limit = 5) => {
  return async (dispatch, getState) => {
    const response = await apiReq.get("/fault", {
      params: {
        page: pageNo,
        limit: limit,
      },
    });
    // console.log(response.data);
    if (!response.data.allFault) {
      return dispatch(ErrorAction(response.data));
    }
    dispatch({ type: "GET_ALL_FAULT", payload: response.data });
  };
};

export const deletedFault = (id, action) => {
  return async (dispatch, getState) => {
    console.log(id, action);
    const res = await apiReq.post(`/fault/${id}`, {
      ...action,
    });
    dispatch({ type: "DELETE_FAULT", payload: id });
    history.push("/admin/issue");
    // return getAllFault();
  };
};

export const changePage = (path) => {
  return async (dispatch) => {
    history.push(path);
  };
};

export const removeRs = () => {
  return async (dispatch) => {
    dispatch({ type: "REMOVE_RS" });
  };
};

export const removeSensor = () => {
  return async (dispatch) => {
    dispatch({ type: "REMOVE_SENSOR" });
  };
};
// export const CleaningCurrentUser = () => {
//   return (dispatch, getState) => {
//     dispatch({ type: "CLEAN_USER" });
//   };
// };
