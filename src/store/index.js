import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/user";
import { userAPI } from "./services/UserService";
import { productionsAPI } from "./services/ProductionService";
import { productsAPI } from "./services/ProductsService";
import { categoriesAPI } from "./services/CategoriesService";
import { ordersAPI } from "./services/OrderService";

export const createStore = (options) =>
  configureStore({
    reducer: {
      user: usersReducer,
      [userAPI.reducerPath]: userAPI.reducer,
      [productionsAPI.reducerPath]: productionsAPI.reducer,
      [productsAPI.reducerPath]: productsAPI.reducer,
      [categoriesAPI.reducerPath]: categoriesAPI.reducer,
      [ordersAPI.reducerPath]: ordersAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userAPI.middleware)
        .concat(ordersAPI.middleware)
        .concat(productsAPI.middleware)
        .concat(productionsAPI.middleware)
        .concat(categoriesAPI.middleware),
    ...options,
  });

export const store = createStore();
