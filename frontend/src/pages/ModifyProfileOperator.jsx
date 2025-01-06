import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormModifyUser from "./../components/FormModifyUser";

export default function ModifyProfileOperator() {

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <FormModifyUser />
      </Grid>
    </Box>
  );
}
