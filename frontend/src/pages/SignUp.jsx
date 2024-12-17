import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function SignUp() {
  const [rol, setRol] = React.useState("");

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100vh", padding: "6rem" }}>
      <Paper elevation={8} sx={{}}>
        <Box
          sx={{
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Rol</InputLabel>
            <Select
              id="select-rol"
              value={rol}
              label="Rol"
              onChange={handleChange}
            >
              <MenuItem value="Cliente">Cliente</MenuItem>
              <MenuItem value="Operador">Operador</MenuItem>
            </Select>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  margin="normal"
                  type="number"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Razón social"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={rol === "Operador"}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Nombre comercial"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={rol === "Operador"}
                />
              </Grid>
            </Grid>

            <TextField
              label="Dirección de entrega"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              disabled={rol === "Operador"}
            />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ marginTop: 2, width: "25%" }}
              >
                Registrarse
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
}
