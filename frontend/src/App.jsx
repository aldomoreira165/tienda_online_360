import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';

export default function ButtonUsage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    ); 
}
