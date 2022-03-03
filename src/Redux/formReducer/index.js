import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  gender: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formUpdate: (state, action) => {
      const { name, email, gender } = action.payload;

      state.name = name;
      state.email = email;
      state.gender = gender;

    },
    formClear: (state) => {
      state.name = "";
      state.email = "";
      state.gender = "";
    },
  },
});

export const { formUpdate, formClear } = formSlice.actions;

export default formSlice.reducer;
