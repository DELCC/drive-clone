import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  authReady: false, // passe à true dès la 1ère réponse de onAuthStateChanged
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.value = action.payload;
      state.authReady = true;
    },
    deleteUserFromStore: (state) => {
      state.value = null;
      state.authReady = true;
    },
  },
});

export const { addUserToStore, deleteUserFromStore } = userSlice.actions;
export default userSlice.reducer;
