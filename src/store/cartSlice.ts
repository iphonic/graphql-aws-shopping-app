import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "src/screens/CartScreen/Cart.type";
import { RootState } from ".";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

/** We are matching Product Id with Cart Item from graphql */
export const productIsInCart = (state: RootState, id: number): boolean => {
  return state.cart.items.some(
    (item) => parseInt(item.metadata.productid) === id
  );
};

/** Calculating number of items in Cart */
export const selectCartQuantity = (state: RootState): number =>
  state.cart.items.reduce(
    (sum, item) => sum + (item.metadata?.quantity || 0),
    0
  );

/** We are matching Product Id with Cart Item Product Id from graphql to find exact cart object*/
export const cartItemById = (
  state: RootState,
  id: number
): CartItem | undefined => {
  return state.cart.items.find(
    (item) => parseInt(item.metadata.productid) === id
  );
};

export const { loadCart } = cartSlice.actions;
export default cartSlice.reducer;
