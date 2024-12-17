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
import AppBarBack from "./../components/AppBarBack";
import axios from "axios";

export default function SignUp() {
  const [rol, setRol] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [contraseña, setContraseña] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [fechaNacimiento, setFechaNacimiento] = React.useState("");
  const [razonSocial, setRazonSocial] = React.useState("");
  const [nombreComercial, setNombreComercial] = React.useState("");
  const [direccionEntrega, setDireccionEntrega] = React.useState("");

  const handleSubmit = async () => {
    if (rol === "Operador") {
      const data = {
        estados_idEstados: 1,
        correo_electronico: email,
        nombre_completo: nombre,
        password: contraseña,
        telefono: telefono,
        fecha_nacimiento: fechaNacimiento
      }

      console.log(data);

      const response = await axios.post("http://localhost:3000/api/v1/usuarios/operador", data);
      console.log(response);
    } 
  };

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  return (
    <Box>
      <AppBarBack url="/" />
      <Box
        sx={{
          flexGrow: 1,
          height: "90vh",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper elevation={8} sx={{ height: "90%", width: "100%" }}>
          <Box
            sx={{
              padding: "3rem",
            }}
          >
            <FormControl fullWidth sx={{ height: "100%" }}>
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Contraseña"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    required
                    fullWidth
                    onChange={(e) => setContraseña(e.target.value)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Fecha de nacimiento"
                    variant="outlined"
                    margin="normal"
                    type="normal"
                    required
                    fullWidth
                    onChange={(e) => setFechaNacimiento(e.target.value)}
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
                    onChange={(e) => setRazonSocial(e.target.value)}
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
                    onChange={(e) => setNombreComercial(e.target.value)}
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
                onChange={(e) => setDireccionEntrega(e.target.value)}
                disabled={rol === "Operador"}
              />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ marginTop: 2, width: "25%" }}
                  onClick={handleSubmit}
                >
                  Registrarse
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
