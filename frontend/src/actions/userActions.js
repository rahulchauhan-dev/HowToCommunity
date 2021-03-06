import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: "USER_LOGOUT",
  });
  dispatch({
    type: "USER_DETAILS_RESET",
  });
  dispatch({
    type: "USER_MYPOSTS_RESET",
  });
  dispatch({
    type: "POST_SAVEDLIST_RESET",
  });
};

export const register = (name, gender, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, gender, email, password },
      config
    );

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_PROFILE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_PROFILE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserMyPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_MYPOSTS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users/myposts", config);

    dispatch({
      type: "USER_MYPOSTS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_MYPOSTS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSavedPosts = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "POST_SAVEDLIST_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/saved`, config);

    const filtered = [];
    const filter = () => {
      data.forEach((element) => {
        if (element.post !== null) {
          filtered.push(element);
        }
      });
    };

    filter();

    dispatch({
      type: "POST_SAVEDLIST_SUCCESS",
      payload: filtered,
    });
  } catch (error) {
    dispatch({
      type: "POST_SAVEDLIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userPublicProfileAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "USER_PUBLIC_PROFILE_REQUEST" });

    const { data } = await axios.get(`/api/users/${id}`);

    dispatch({
      type: "USER_PUBLIC_PROFILE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_PUBLIC_PROFILE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
