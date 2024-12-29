import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import ClientDashboard from "./pages/ClientDashboard";
import OperatorLayout from "./layouts/OperatorLayout";
import ClientLayout from "./layouts/ClientLayout";
import OperatorDashboard from "./pages/OperatorDashboard";
import AddProduct from "./pages/AddProduct";
import ModifyProduct from "./pages/ModifyProduct";
import AddCategory from "./pages/AddCategory";
import ModifyCategory from "./pages/ModifyCategory";
import AddUser from "./pages/AddUser";
import ActiveUser from "./pages/ActiveUser";
import InactiveUser from "./pages/InactiveUser";
import AddClient from "./pages/AddClient";
import ModifyClient from "./pages/ModifyClient";
import Cart from "./pages/Cart";
import ConfirmCart from "./pages/ConfirmCart";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>

                <Route path="/client" element={<ClientLayout />}>
                    <Route index element={<ClientDashboard/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="cart/confirm" element={<ConfirmCart/>}/>
                </Route>

                <Route path="/operator" element={<OperatorLayout />}>
                    <Route index element={<OperatorDashboard/>}/>
                    <Route path="product/add" element={<AddProduct/>}/>
                    <Route path="product/modify" element={<ModifyProduct/>}/>
                    <Route path="category/add" element={<AddCategory/>}/>
                    <Route path="category/modify" element={<ModifyCategory/>}/>
                    <Route path="user/add" element={<AddUser/>}/>
                    <Route path="user/active" element={<ActiveUser/>}/>
                    <Route path="user/inactive" element={<InactiveUser/>}/>
                    <Route path="client/add" element={<AddClient/>}/>
                    <Route path="client/modify" element={<ModifyClient/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    ); 
}
