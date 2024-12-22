import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBarBack from "../components/AppBarBack";
import AlertMessage from "../components/AlertMessage";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Pag1 from "../components/Pag1";
import Pag2 from "../components/Pag2";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SignUp() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [direccionEntrega, setDireccionEntrega] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  // esquema de validacion de formulario
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Correo electrónico no válido")
      .max(50, "El correo electrónico no debe tener más de 50 caracteres")
      .required("Correo electrónico requerido"),
    name: yup.string().required("El nombre es requerido"),
    password: yup
      .string()
      .min(4, "La contraseña debe tener al menos 4 caracteres")
      .max(20, "La contraseña no debe tener más de 20 caracteres")
      .required("La contraseña es requerida"),
    phone: yup
      .string()
      .max(8, "El teléfono debe tener 8 dígitos")
      .required("El teléfono es requerido"),
    birthdate: yup.date().required("La fecha de nacimiento es requerida"),
    companyName: yup
      .string()
      .max(245, "La razón social no debe tener más de 245 caracteres")
      .required("La razón social es requerida"),
    tradeName: yup
      .string()
      .max(100, "El nombre comercial no debe tener más de 100 caracteres")
      .required("El nombre comercial es requerido"),
    deliveryAdress: yup
      .string()
      .max(100, "La dirección de entrega no debe tener más de 100 caracteres")
      .required("La dirección de entrega es requerida"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
      let data = {
        estados_idEstados: 1,
        correo_electronico: email,
        nombre_completo: nombre,
        password: contraseña,
        telefono: telefono,
        fecha_nacimiento: fechaNacimiento,
        razon_social: razonSocial,
        nombre_comercial: nombreComercial,
        direccion_entrega: direccionEntrega,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/usuarios/cliente",
        data
      );

      if (response.status === 201 || response.status === 200) {
        setAlertMessage("¡Usuario registrado con éxito!");
        setAlertSeverity("success");

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
        error.response?.data?.mensaje || "Error al registrar el usuario."
      );
      setAlertSeverity("error");
    } finally {
      setOpenAlert(true);
    }
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
          width: "100%",
          padding: "2rem",
          paddingTop: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" component="h1" gutterBottom align="center">
            Registro de Clientes
          </Typography>
          <Paper
            elevation={8}
            sx={{ height: "90%", width: "100%", marginTop: 5 }}
          >
            <Box
              sx={{
                padding: "3rem",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Correo electrónico"
                      variant="outlined"
                      margin="normal"
                      value={email}
                      {...register("email")}
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Nombre"
                      variant="outlined"
                      margin="normal"
                      type="text"
                      value={nombre}
                      {...register("name")}
                      required
                      fullWidth
                      onChange={(e) => setNombre(e.target.value)}
                      error={!!errors.name}
                      helperText={errors.name?.message}
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
                      {...register("password")}
                      type="password"
                      required
                      fullWidth
                      onChange={(e) => setContraseña(e.target.value)}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="Teléfono"
                      variant="outlined"
                      margin="normal"
                      value={telefono}
                      {...register("phone")}
                      type="tel"
                      required
                      fullWidth
                      onChange={(e) => setTelefono(e.target.value)}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="Fecha de nacimiento"
                      variant="outlined"
                      margin="normal"
                      value={fechaNacimiento}
                      {...register("birthdate")}
                      type="date"
                      required
                      fullWidth
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      error={!!errors.birthdate}
                      helperText={errors.birthdate?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Razón social"
                      variant="outlined"
                      margin="normal"
                      type="text"
                      value={razonSocial}
                      {...register("companyName")}
                      required
                      fullWidth
                      onChange={(e) => setRazonSocial(e.target.value)}
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Nombre comercial"
                      variant="outlined"
                      margin="normal"
                      type="text"
                      value={nombreComercial}
                      {...register("tradeName")}
                      required
                      fullWidth
                      onChange={(e) => setNombreComercial(e.target.value)}
                      error={!!errors.tradeName}
                      helperText={errors.tradeName?.message}
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Dirección de entrega"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  value={direccionEntrega}
                  {...register("deliveryAdress")}
                  required
                  fullWidth
                  onChange={(e) => setDireccionEntrega(e.target.value)}
                  error={!!errors.deliveryAdress}
                  helperText={errors.deliveryAdress?.message}
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ marginTop: 2, width: "25%" }}
                    type="submit"
                  >
                    Registrarse
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Pag1 />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Pag2 />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
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
