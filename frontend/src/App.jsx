import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import ClientDashboard from "./pages/ClientDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";

export default function ButtonUsage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/client" element={<ClientDashboard/>}/>
                <Route path="/operator" element={<OperatorDashboard/>}/>
            </Routes>
        </BrowserRouter>
    ); 
}
