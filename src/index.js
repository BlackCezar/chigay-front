import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import ProductsPage from "./containers/ProductsPage";
import DashboardPage from './containers/DashboardPage'
import Logout from "./containers/Logout";
import Cart from "./containers/Cart";
import theme from "./theme";
import Layout from "./components/Layout";
import AdminCategories from "./containers/AdminCategories";
import AdminProducts from "./containers/AdminProducts";
import AdminOrders from "./containers/AdminOrders";
import AdminProductions from "./containers/AdminProductions";
import ProductDetailPage from './components/ProductDetailPage.jsx'

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
              path="categories/:categoryId"
              element={
                <Layout>
                  <ProductsPage />
                </Layout>
              }
            />
            <Route
              path="products/:productId"
              element={
                <Layout>
                  <ProductDetailPage />
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
              path="admin/productions"
              element={
                <Layout>
                  <AdminProductions />
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
