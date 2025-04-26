import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null || JSON.parse(localStorage.getItem("user")),
  // tokern: null,
  // id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload.currentUser;
      // state.email = action.payload.email;
      // state.token = action.payload.token;
      // state.id = action.payload.id;
    },
    removeUser(state) {
      localStorage.removeItem("user");
      state.displayName = null;
      //state.userName = null;
      // state.token = null;
      // state.id = null;
      // state.currentUser = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
