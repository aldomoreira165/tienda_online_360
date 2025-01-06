import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ClientDashboard from "./pages/ClientDashboard";
import OperatorLayout from "./layouts/OperatorLayout";
import ClientLayout from "./layouts/ClientLayout";
import OperatorDashboard from "./pages/OperatorDashboard";
import AddProduct from "./pages/AddProduct";
import ModifyProduct from "./pages/ModifyProduct";
import ProductsData from "./pages/ProductsData";
import CategoriesData from "./pages/CategoriesData";
import AddCategory from "./pages/AddCategory";
import ModifyCategory from "./pages/ModifyCategory";
import UsersData from "./pages/UsersData";
import AddUser from "./pages/AddUser";
import ModifyProfileClient from "./pages/ModifyProfileClient";
import ModifyProfileOperator from "./pages/ModifyProfileOperator";
import ActiveUser from "./pages/ActiveUser";
import InactiveUser from "./pages/InactiveUser";
import ClientsData from "./pages/ClientsData";
import AddClient from "./pages/AddClient";
import ModifyClient from "./pages/ModifyClient";
import Cart from "./pages/Cart";
import ConfirmCart from "./pages/ConfirmCart";
import HistoryClient from "./pages/HistoryClient";
import ConfirmOrdersOperator from "./pages/ConfirmOrdersOperator";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute allowedRoles={[1]} />}>
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="cart" element={<Cart />} />
            <Route path="cart/confirm" element={<ConfirmCart />} />
            <Route path="history" element={<HistoryClient />} />
            <Route path="profile" element={<ModifyProfileClient />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[2]} />}>
          <Route path="/operator" element={<OperatorLayout />}>
            <Route index element={<OperatorDashboard />} />
            <Route path="products" element={<ProductsData />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product/modify" element={<ModifyProduct />} />
            <Route path="categories" element={<CategoriesData />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/modify" element={<ModifyCategory />} />
            <Route path="users" element={<UsersData />} />
            <Route path="user/add" element={<AddUser />} />
            <Route path="user/active" element={<ActiveUser />} />
            <Route path="user/inactive" element={<InactiveUser />} />
            <Route path="clients" element={<ClientsData />} />
            <Route path="client/add" element={<AddClient />} />
            <Route path="client/modify" element={<ModifyClient />} />
            <Route path="order/confirm" element={<ConfirmOrdersOperator />} />
            <Route path="profile" element={<ModifyProfileOperator />} />
          </Route>
        </Route>

        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
