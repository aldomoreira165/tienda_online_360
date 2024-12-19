import AppBarOperator from "./../components/AppBarOperator";
import AsideBar from "./../components/AsideBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function ModifyProduct() {
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
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  marginTop: 6,
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  align="center"
                >
                  Modificar producto
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Paper elevation={4} sx={{ width: "100%" }}>
                  <Box padding={3} sx={{ width: "100%" }}>
                    <FormControl
                      fullWidth
                      sx={{ height: "100%", width: "100%" }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Nombre"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            required
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            label="Marca"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            required
                            fullWidth
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <TextField
                            label="Categoría"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            label="Stock"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            label="Código"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            required
                            fullWidth
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Estado"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Precio"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        label="Foto (url)"
                        variant="outlined"
                        margin="normal"
                        type="url"
                        required
                        fullWidth
                      />

                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          sx={{ marginTop: 2, width: "25%" }}
                        >
                          Modificar producto
                        </Button>
                      </Box>
                    </FormControl>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ModifyProduct;
