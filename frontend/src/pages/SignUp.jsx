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
import AlertMessage from "./../components/AlertMessage";
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
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleSubmit = async () => {
    try {
      let data = {
        estados_idEstados: 1,
        correo_electronico: email,
        nombre_completo: nombre,
        password: contraseña,
        telefono: telefono,
        fecha_nacimiento: fechaNacimiento,
      };

      if (rol === "Cliente") {
        data = {
          ...data,
          razon_social: razonSocial,
          nombre_comercial: nombreComercial,
          direccion_entrega: direccionEntrega,
        };
      }

      const url =
        rol === "Operador"
          ? "http://localhost:3000/api/v1/usuarios/operador"
          : "http://localhost:3000/api/v1/usuarios/cliente";

      const response = await axios.post(url, data);

      if (response.status === 201 || response.status === 200) {
        setAlertMessage("¡Usuario registrado con éxito!");
        setAlertSeverity("success");
        
        setRol("");
        setEmail("");
        setNombre("");
        setContraseña("");
        setTelefono("");
        setFechaNacimiento("");
        setRazonSocial("");
        setNombreComercial("");
        setDireccionEntrega("");
      } else {
        setAlertMessage("Algo salió mal. Inténtalo de nuevo.");
        setAlertSeverity("error");
      }
    } catch (error) {
      setAlertMessage(
        error.response?.data?.message || "Error al registrar el usuario."
      );
      setAlertSeverity("error");
    } finally {
      setOpenAlert(true);
    }
  };

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
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
                    value={email}
                    required
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={rol === ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    margin="normal"
                    value={nombre}
                    required
                    fullWidth
                    onChange={(e) => setNombre(e.target.value)}
                    disabled={rol === ""}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Contraseña"
                    variant="outlined"
                    margin="normal"
                    value={contraseña}
                    type="password"
                    required
                    fullWidth
                    onChange={(e) => setContraseña(e.target.value)}
                    disabled={rol === ""}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    margin="normal"
                    value={telefono}
                    type="number"
                    required
                    fullWidth
                    onChange={(e) => setTelefono(e.target.value)}
                    disabled={rol === ""}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Fecha de nacimiento"
                    variant="outlined"
                    margin="normal"
                    value={fechaNacimiento}
                    type="normal"
                    required
                    fullWidth
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    disabled={rol === ""}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Razón social"
                    variant="outlined"
                    margin="normal"
                    value={razonSocial}
                    required
                    fullWidth
                    onChange={(e) => setRazonSocial(e.target.value)}
                    disabled={rol === "Operador" || rol === ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Nombre comercial"
                    variant="outlined"
                    margin="normal"
                    value={nombreComercial}
                    required
                    fullWidth
                    onChange={(e) => setNombreComercial(e.target.value)}
                    disabled={rol === "Operador" || rol === ""}
                  />
                </Grid>
              </Grid>

              <TextField
                label="Dirección de entrega"
                variant="outlined"
                margin="normal"
                value={direccionEntrega}
                required
                fullWidth
                onChange={(e) => setDireccionEntrega(e.target.value)}
                disabled={rol === "Operador" || rol === ""}
              />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ marginTop: 2, width: "25%" }}
                  onClick={handleSubmit}
                  disabled={
                    rol === "" ||
                    email === "" ||
                    nombre === "" ||
                    contraseña === "" ||
                    telefono === "" ||
                    fechaNacimiento === "" ||
                    (rol === "Cliente" &&
                      (razonSocial === "" ||
                        nombreComercial === "" ||
                        direccionEntrega === ""))
                  }
                >
                  Registrarse
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Paper>
      </Box>
      <AlertMessage
        openAlert={openAlert}
        closeAlert={handleCloseAlert}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
      />
    </Box>
  );
}
