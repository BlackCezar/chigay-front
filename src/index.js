import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import DashboardPage from "./containers/DashboardPage";
import ProductsPage from "./containers/ProductsPage";
import Logout from "./containers/Logout";
import Cart from "./containers/Cart";
import theme from "./theme";
import Layout from "./components/Layout";
import AdminCategories from "./containers/AdminCategories";
import AdminProducts from "./containers/AdminProducts";
import AdminOrders from "./containers/AdminOrders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <ProductsPage />
                </Layout>
              }
            />
            <Route
              path="dashboard"
              element={
                <Layout>
                  <DashboardPage />
                </Layout>
              }
            />
            <Route
              path="login"
              element={
                <Layout>
                  <App />
                </Layout>
              }
            />
            <Route
              path="cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />
            <Route
              path="admin/products"
              element={
                <Layout>
                  <AdminProducts />
                </Layout>
              }
            />
            <Route
              path="admin/orders"
              element={
                <Layout>
                  <AdminOrders />
                </Layout>
              }
            />
            <Route
              path="admin/categories"
              element={
                <Layout>
                  <AdminCategories />
                </Layout>
              }
            />
            <Route
              path="logout"
              element={
                <Layout>
                  <Logout />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <Heading>Здесь ничего нет</Heading>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
