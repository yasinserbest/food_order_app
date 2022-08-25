import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filter: "chicken",
    orderModalProduct: "",
    loading: false,
  },
  reducers: {
    loadProducts(state, action) {
      state.items = action.payload;
    },
    producstsFilter(state, action) {
      state.filter = action.payload;
    },
    setorderModalItem(state, action) {
      const orderId = action.payload.id;
      const products = action.payload.items;
      state.orderModalProduct = products.find(
        (product) => product.id === parseInt(orderId)
      );
    },
    changeLoadingEvent(state) {
      state.loading = !state.loading;
    },
  },
});
export const fetchProducts = (category) => {
  return async (dispatch) => {
    const fetchData = async () => {
      //bak burda başka bi fonksiyon oluşturuyor
      dispatch(productsActions.changeLoadingEvent());
      const response = await fetch(
        `https://troy-restaurant-default-rtdb.firebaseio.com/products/${category}.json`
      );
      if (!response.ok) {
        dispatch(productsActions.changeLoadingEvent());
        throw new Error("Couldnt fetch cart daata!");
      }
      const data = await response.json();
      dispatch(productsActions.changeLoadingEvent());
      return data;
    };
    try {
      const products = await fetchData(); //sonra burda çağırıyor, diğerinde de öyle yaptı bi func. içine async fun. oluşturup aynı fonksiyonda çağırıyor
      const newProducts = [];
      for (const key in products) {
        newProducts.push({
          id: products[key].id,
          desc: products[key].desc,
          name: products[key].name,
          optionalIngredients: products[key].optionalIngredients,
          price: products[key].price,
          img: products[key].img,
        });
      }
      dispatch(productsActions.loadProducts(newProducts));
    } catch (error) {
      console.log(error);
    }
  };
};

export const productsActions = productsSlice.actions;
export default productsSlice;
