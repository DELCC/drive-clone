import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.value = action.payload;
    },
    deleteUserFromStore: (state) => {
      state.value = null;
    },
  },
});

export const { addUserToStore, deleteUserFromStore } = userSlice.actions;
export default userSlice.reducer;
