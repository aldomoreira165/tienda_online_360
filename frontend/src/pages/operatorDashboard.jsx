import AppBarOperator from "../components/AppBarOperator";
import AsideBar from "../components/AsideBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function OperatorDashboard() {
  return (
    <Box sx={{ height: "calc(100vh - 96px)" }}>
      <AppBarOperator />
      <Box sx={{ marginTop: "96px", height: "calc(100vh - 96px)" }}>
        <Grid container spacing={0} sx={{ height: "100%" }}>
          <Grid
            item
            xs={2}
            sx={{ height: "100%", borderRight: "1px solid #ccc" }}
          >
            <AsideBar />
          </Grid>
          <Grid item xs={10} sx={{ height: "100%" }}>
            <h1>Dashboard</h1>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
