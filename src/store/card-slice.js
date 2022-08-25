import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    items: [],
    totalQuantity: 0,
    cardTotalPrice: 0,
    addedCardVisible: false,
  },
  reducers: {
    addItemToCart(state, action) {
      state.addedCardVisible = true;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity += newItem.piece;
      state.cardTotalPrice += newItem.price * newItem.piece;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          img: newItem.img,
          name: newItem.name,
          desc: newItem.desc,
          price: newItem.price,
          //optionalIngredients: newItem.optionalIngredients,
          removedIngredients: newItem.removedIngredients,
          addedIngredients: newItem.addedIngredients,
          piece: newItem.piece,
          itemTotalPrice: newItem.price * newItem.piece,
        });
      } else {
        existingItem.piece += newItem.piece;
        existingItem.itemTotalPrice =
          existingItem.itemTotalPrice + newItem.price * newItem.piece;
      }
    },
    changeCardAdded(state) {
      state.addedCardVisible = false;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.cardTotalPrice -= existingItem.price;
      if (existingItem.piece === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.piece--;
      }
    },
    removeAllItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity -= existingItem.piece;
      state.cardTotalPrice -= existingItem.itemTotalPrice;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.cardTotalPrice = 0;
    },
  },
});

export const cardActions = cardSlice.actions;
export default cardSlice;
