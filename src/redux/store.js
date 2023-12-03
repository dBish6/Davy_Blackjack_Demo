import { configureStore } from "@reduxjs/toolkit";
import blackjackReducer from "./blackjackSlice";

const store = configureStore({
  reducer: {
    blackjack: blackjackReducer,
  },
});

export default store;
