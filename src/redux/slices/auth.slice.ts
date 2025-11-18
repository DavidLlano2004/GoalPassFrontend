import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  isLogged: false,
  rol: "",
  email: "",
  name: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginCase: (state, action) => {
      state.id = action.payload.id;
      state.isLogged = true;
      state.rol = action.payload.rol;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    singOffCase: () => initialState,
  },
});

export const { loginCase, singOffCase } = authSlice.actions;
export default authSlice.reducer;
