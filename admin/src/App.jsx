import React from "react";
import "./index.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/admin/DashboardPage";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import ProductPage from "./pages/admin/ProductPage";
import UserPage from "./pages/admin/UserPage";
import BlogPage from "./pages/admin/BlogPage";

import BrandPage from "./pages/admin/BrandPage";
import CategoryPage from "./pages/admin/CategoryPage";
import OrderPage from "./pages/admin/OrderPage";
import BCategoryPage from "./pages/admin/BCategoryPage";
import CouponPage from "./pages/admin/CouponPage";
import AddBlogPage from "./pages/admin/AddBlogPage";
import AddBCategoryPage from "./pages/admin/AddBCategoryPage";
import AddCategoryPage from "./pages/admin/AddCategoryPage";
import AddBrandPage from "./pages/admin/AddBrandPage";
import AddProductPage from "./pages/admin/AddProductPage";
import LoginPage from "./pages/LoginPage";
import AddCouponPage from "./pages/admin/AddCouponPage";
import SupplierPage from "./pages/admin/SupplierPage";
import AddSupplierPage from "./pages/admin/AddSupplierPage";
import ShippingPage from "./pages/admin/ShippingPage";
import AddShippingPage from "./pages/admin/AddShippingPage";
import ReceiptPage from "./pages/admin/ReceiptPage";
import AddReceiptPage from "./pages/admin/AddReceiptPage";
import DetailProductPage from "./pages/admin/DetailProductPage";
import OrderDetailPage from "./pages/admin/OrderDetailPage";
import ReviewPage from "./pages/admin/ReviewPage";
import AddUserPage from "./pages/admin/AddUserPage";
import TYPE_EMPLOYEE from "./utils/userType.js";
import { useSelector } from "react-redux";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";
import LayoutSale from "./components/admin/LayoutSale.jsx";
import LayoutInventory from "./components/admin/LayoutInventory.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";
function App() {
  const PrivateRoutes = ({ children }) => {
    const getToken = localStorage.getItem("token");
    return getToken !== " " ? (
      children
    ) : (
      <Navigate to="/login" replace={true} />
    );
  };
  const PrivateRoute = ({ element, requiredPermission = [] }) => {
    const userType = useSelector((state) => state.auth.user.role);
    const hasPermission =
      requiredPermission.length === '' || requiredPermission.includes(userType);

    return hasPermission ? (
      element
    ) : (
      <Navigate
        to="/unauthorized"
        replace
        state={{ from: window.location.pathname }}
      />
    );
  };
  const userState = useSelector((state) => state.auth.user);

  return (
    <ChatContextProvider user={userState}>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route
            path="dashboard"
            element={
              <PrivateRoute
                element={<DashboardPage />}
                requiredPermission={[TYPE_EMPLOYEE.ADMIN]}
              />
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute
                element={<UserPage />}
                requiredPermission={[TYPE_EMPLOYEE.ADMIN]}
              />
            }
          />
          <Route
            path="chat"
            element={
              <PrivateRoute
                element={<ChatPage />}
                requiredPermission={[TYPE_EMPLOYEE.ADMIN]}
              />
            }
          />
          <Route
            path="user"
            element={
              <PrivateRoute
                element={<AddUserPage />}
                requiredPermission={[TYPE_EMPLOYEE.ADMIN]}
              />
            }
          />
            <Route
            path="user/:id"
            element={
              <PrivateRoute
                element={<AddUserPage />}
                requiredPermission={[TYPE_EMPLOYEE.ADMIN]}
              />
            }
          />
          <Route
            path="reviews"
            element={
              <PrivateRoute
                element={<ReviewPage />}
                requiredPermission={[TYPE_EMPLOYEE.ADMIN]}
              />
            }
          />
        </Route>
        <Route path="/sale" element={<LayoutSale />}>
          <Route
            index
            path="blogs"
            element={
              <PrivateRoute
                element={<BlogPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="blog"
            element={
              <PrivateRoute
                element={<AddBlogPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="blog/:id"
            element={
              <PrivateRoute
                element={<AddBlogPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="bcategories"
            element={
              <PrivateRoute
                element={<BCategoryPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="bcategory"
            element={
              <PrivateRoute
                element={<AddBCategoryPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="bcategory/:id"
            element={
              <PrivateRoute
                element={<AddBCategoryPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="brands"
            element={
              <PrivateRoute
                element={<BrandPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="brand"
            element={
              <PrivateRoute
                element={<AddBrandPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="brand/:id"
            element={
              <PrivateRoute
                element={<AddBrandPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="categories"
            element={
              <PrivateRoute
                element={<CategoryPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="category"
            element={
              <PrivateRoute
                element={<AddCategoryPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="category/:id"
            element={
              <PrivateRoute
                element={<AddCategoryPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="coupons"
            element={
              <PrivateRoute
                element={<CouponPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="coupon"
            element={
              <PrivateRoute
                element={<AddCouponPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="coupon/:id"
            element={
              <PrivateRoute
                element={<AddCouponPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="shipping"
            element={
              <PrivateRoute
                element={<ShippingPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="ship"
            element={
              <PrivateRoute
                element={<AddShippingPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="ship/:id"
            element={
              <PrivateRoute
                element={<AddShippingPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="orders"
            element={
              <PrivateRoute
                element={<OrderPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="order/:id"
            element={
              <PrivateRoute
                element={<OrderDetailPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
          <Route
            path="chat"
            element={
              <PrivateRoute
                element={<ChatPage />}
                requiredPermission={[TYPE_EMPLOYEE.SALE]}
              />
            }
          />
        </Route>
        <Route path="/inventory" element={<LayoutInventory />}>
          <Route
            index
            path="products"
            element={
              <PrivateRoute
                element={<ProductPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="product"
            element={
              <PrivateRoute
                element={<AddProductPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="product/:id"
            element={
              <PrivateRoute
                element={<AddProductPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="product/view/:id"
            element={
              <PrivateRoute
                element={<DetailProductPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="suppliers"
            element={
              <PrivateRoute
                element={<SupplierPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="supplier"
            element={
              <PrivateRoute
                element={<AddSupplierPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="supplier/:id"
            element={
              <PrivateRoute
                element={<AddSupplierPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="receipts"
            element={
              <PrivateRoute
                element={<ReceiptPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="receipt"
            element={
              <PrivateRoute
                element={<AddReceiptPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
          <Route
            path="receipt/:id"
            element={
              <PrivateRoute
                element={<AddReceiptPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
           <Route
            path="chat"
            element={
              <PrivateRoute
                element={<ChatPage />}
                requiredPermission={[TYPE_EMPLOYEE.INVENTORY]}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </ChatContextProvider>
  );
}

export default App;
