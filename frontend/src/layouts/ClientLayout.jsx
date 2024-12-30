import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppBarClient from "./../components/AppBarClient";


export default function ClientLayout() {
    return (
        <Box>
            <AppBarClient />
            <Outlet />
        </Box>
    )
}
