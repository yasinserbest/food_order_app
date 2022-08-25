import { createSlice } from "@reduxjs/toolkit";
import { useState, useDispatch } from "react-redux";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
  },
  reducers: {
    findUser(state, action) {
      state.user.email = action.payload.email;
      state.user.role = action.payload.role;
      state.user.adress = action.payload.adress;
      state.user.phone = action.payload.phone;
      state.user.name = action.payload.name;
      //state.user.orders = action.payload.user.orders;
      state.user.id = action.payload.id;
    },
    deleteUser(state) {
      state.user = {};
    },
  },
});

export const findCurrentUser = (email) => {
  return async (dispatch) => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://troy-restaurant-default-rtdb.firebaseio.com/users.json"
      );
      if (!response.ok) {
        throw new Error("Couldnt fetch users!");
      }

      const data = await response.json();
      return data;
    };
    try {
      const users = await fetchUsers();
      for (const key in users) {
        if (users[key].user.email == email) {
          dispatch(
            userActions.findUser({
              role: users[key].user.role,
              id: key,
              email: users[key].user.email,
              adress: users[key].user.adress,
              phone: users[key].user.phone,
              name: users[key].user.name,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export async function addUser(userData) {
  const response = await fetch(
    `https://troy-restaurant-default-rtdb.firebaseio.com/users.json`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
}

export const userActions = userSlice.actions;
export default userSlice;
