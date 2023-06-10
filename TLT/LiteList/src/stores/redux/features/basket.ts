import {createSlice} from '@reduxjs/toolkit';
import {useAsyncStorage, asyncStorageIndex} from '../../async';

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: [],
    isBasket: false,
  },
  reducers: {
    addToBasket: (state: any, action) => {
      const item = action.payload;
      const basketIndex = state.basket.findIndex(
        (element: any) =>
          element.product === item.product &&
          element.brand === item.brand &&
          element.size === item.size,
      );
      if (basketIndex === -1) {
        state.basket.push(item);
      } else {
        state.basket.splice(basketIndex, 1, {
          ...item,
          quantity: item.quantity + 1,
        });
      }

      const {handleStore} = useAsyncStorage();
      handleStore({
        key: asyncStorageIndex.updateBasket,
        value: state.basket,
      });
    },
    handleToggleCheckout: (state: any, action) => {
      const isBasket = action.payload;
      state.isBasket = isBasket;
    },
    handleSetBasket: (state: any, action) => {
      const basket = action.payload;
      state.basket = basket;
    },
    increaseQuantity: (state: any, action) => {
      const item = action.payload;
      const basketIndex = state.basket.findIndex(
        (element: any) =>
          element.product === item.product &&
          element.brand === item.brand &&
          element.size === item.size,
      );

      if (basketIndex === -1) {
      } else {
        state.basket.splice(basketIndex, 1, {
          ...item,
          quantity: item.quantity + 1,
        });
      }
    },
    decreaseQuantity: (state: any, action) => {
      const item = action.payload;
      const basketIndex = state.basket.findIndex(
        (element: any) =>
          element.product === item.product &&
          element.brand === item.brand &&
          element.size === item.size,
      );

      if (basketIndex === -1) {
      } else {
        if (item.quantity == 1) {
          state.basket.splice(basketIndex, 1);
        } else {
          state.basket.splice(basketIndex, 1, {
            ...item,
            quantity: item.quantity - 1,
          });
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToBasket,
  handleToggleCheckout,
  handleSetBasket,
  increaseQuantity,
  decreaseQuantity,
} = basketSlice.actions;

export const basketReducer = basketSlice.reducer;
