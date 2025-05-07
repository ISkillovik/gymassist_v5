import { createSlice } from "@reduxjs/toolkit";

interface User {
  apiKey: string;
  appName: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  photoURL: string;
  providerData: string[];
  stsTokenManager: string[];
  uid: string;
}

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

const initialState = {
  email: null,
  token: null,
  id: null,
  userName: null,
  currentUser: (() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  })(),
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
      // state.displayName = null;
      state.userName = null;
      // state.token = null;
      // state.id = null;
      // state.currentUser = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
