import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import ClientDashboard from "./pages/ClientDashboard";
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

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/client" element={<ClientDashboard/>}/>
                <Route path="/operator" element={<OperatorDashboard/>}/>
                <Route path="/operator/product/add" element={<AddProduct/>}/>
                <Route path="/operator/product/modify" element={<ModifyProduct/>}/>
                <Route path="/operator/category/add" element={<AddCategory/>}/>
                <Route path="/operator/category/modify" element={<ModifyCategory/>}/>
                <Route path="/operator/user/add" element={<AddUser/>}/>
                <Route path="/operator/user/active" element={<ActiveUser/>}/>
                <Route path="/operator/user/inactive" element={<InactiveUser/>}/>
                <Route path="/operator/client/add" element={<AddClient/>}/>
                <Route path="/operator/client/modify" element={<ModifyClient/>}/>
            </Routes>
        </BrowserRouter>
    ); 
}
