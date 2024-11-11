import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import StorePage from "./pages/StorePage";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import WishListPage from "./pages/WishListPage";
import ForgotPwPage from "./pages/ForgotPwPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import { Navigate } from "react-router-dom";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import ResetPwPage from "./pages/ResetPwPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { useDispatch, useSelector } from "react-redux";
import ChatPage from "./pages/ChatPage";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const PrivateRoutes = ({ children }) => {
    const getToken = localStorage.getItem("token");
    return getToken !== " " ? (
      children
    ) : (
      <Navigate to="/login" replace={true} />
    );
  };
  const userState = useSelector((state) => state.auth.user);

  return (
    <ChatContextProvider user={userState}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/chat" element={userState?._id ? <ChatPage /> : <LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={
                userState?._id ?
                  <CheckoutPage />
                  : <LoginPage />
              }
            />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/account" element={userState?._id ? <AccountPage /> : <LoginPage />}>
              <Route index element={ <ProfilePage />} />
              <Route path="orders" element={userState?._id ? <OrderPage />: <LoginPage />} />
              <Route path="order/:id" element={userState?._id ?  <OrderDetailPage />: <LoginPage />} />
            </Route>

            <Route path="/product" element={<StorePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/wishlist" element={userState?._id ? <WishListPage />: <LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPwPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            <Route path="/reset-password/:token" element={<ResetPwPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </ChatContextProvider>

  );
}

export default App;
