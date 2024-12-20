import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBarOperator from "./../components/AppBarOperator";
import AsideBar from "./../components/AsideBar";

export default function ModifyCategory() {
    return (
        <Box sx={{ height: "calc(100vh - 96px)", width: "100%" }}>
          <AppBarOperator />
          <Box
            sx={{ marginTop: "96px", height: "calc(100vh - 96px)", width: "100%" }}
          >
            <Grid container spacing={0} sx={{ height: "100%", width: "100%" }}>
              <Grid
                item
                xs={2}
                sx={{ height: "100%", borderRight: "1px solid #ccc" }}
              >
                <AsideBar />
              </Grid>
              <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
                <h1>ModifyCategory</h1>
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
}
