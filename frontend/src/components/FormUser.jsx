import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import * as yup from "yup";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AlertMessage from "../components/AlertMessage";

const initialValues = {
  correo_electronico: "",
  nombre: "",
  password: "",
  telefono: "",
  fecha_nacimiento: "",
  cliente: "",
};

export default function FormUser({ rol }) {
  const [clientes, setClientes] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  // esquema de validacion de formulario
  const schema = yup.object().shape({
    correo_electronico: yup
      .string()
      .email("Correo electrónico no válido")
      .max(50, "El correo electrónico no debe tener más de 50 caracteres")
      .required("Correo electrónico requerido"),
    telefono: yup
      .string()
      .max(8, "El teléfono debe tener 8 dígitos")
      .required("El teléfono es requerido"),
    nombre: yup
      .string()
      .max(100, "El nombre no debe tener más de 100 caracteres")
      .required("El nombre es requerido"),
    password: yup
      .string()
      .min(4, "La contraseña debe tener al menos 4 caracteres")
      .max(20, "La contraseña no debe tener más de 20 caracteres")
      .required("La contraseña es requerida"),
    fecha_nacimiento: yup
      .date()
      .required("La fecha de nacimiento es requerida"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/clientes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setClientes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchClientes();
  }, []);

  const validateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const onSubmit = async (data) => {
    try {
      const dataUser = {
        rol_id: rol,
        correo_electronico: data.correo_electronico,
        telefono: data.telefono,
        nombre_completo: data.nombre,
        password: data.password,
        fecha_nacimiento: data.fecha_nacimiento,
        estado_id: 1,
        cliente_id: data.cliente,
      };

      // verificar si el usuario es mayor de 18 años
      if (validateAge(data.fecha_nacimiento) < 18) {
        setAlertSeverity("error");
        setAlertMessage("El usuario debe ser mayor de 18 años.");
        setOpenAlert(true);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/usuarios",
        dataUser
      );

      if (response.status === 200 || response.status === 201) {
        setAlertSeverity("success");
        setAlertMessage("Usuario registrado exitosamente");
        setOpenAlert(true);
        reset(initialValues);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Algo salió mal. Inténtalo de nuevo.");
        setOpenAlert(true);
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error.response.data.message);
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box>
      <Box
        sx={{
          flexGrow: 1,
          height: "55vh",
          width: "100%",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <Paper elevation={8} sx={{ height: "100%", width: "100%" }}>
            <Box padding={3}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Nombre completo"
                      variant="outlined"
                      margin="normal"
                      type="text"
                      fullWidth
                      {...register("nombre")}
                      value={watch("nombre")}
                      error={!!errors.nombre}
                      helperText={errors.nombre?.message}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      {...register("correo_electronico")}
                      value={watch("correo_electronico")}
                      error={!!errors.correo_electronico}
                      helperText={errors.correo_electronico?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Contraseña"
                      variant="outlined"
                      margin="normal"
                      type="password"
                      fullWidth
                      {...register("password")}
                      value={watch("password")}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Teléfono"
                      variant="outlined"
                      margin="normal"
                      type="tel"
                      fullWidth
                      {...register("telefono")}
                      value={watch("telefono")}
                      error={!!errors.telefono}
                      helperText={errors.telefono?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      type="date"
                      fullWidth
                      {...register("fecha_nacimiento")}
                      value={watch("fecha_nacimiento")}
                      error={!!errors.fecha_nacimiento}
                      helperText={errors.fecha_nacimiento?.message}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="cliente-label">Cliente</InputLabel>
                        <Select
                          id="select-cliente"
                          labelId="cliente-label"
                          label="Cliente"
                          fullWidth
                          disabled={rol === 2}
                          value={watch("cliente")}
                          {...register("cliente")}
                          error={!!errors.cliente}
                        >
                          {clientes.map((cliente) => (
                            <MenuItem
                              key={cliente.idClientes}
                              value={cliente.idClientes}
                            >
                              {`${cliente.nombreComercial} - ${cliente.razonSocial}`}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.cliente && (
                          <Typography variant="caption" color="error">
                            {errors.cliente?.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ marginTop: 2, width: "25%" }}
                    type="submit"
                  >
                    Registrar
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
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

FormUser.propTypes = {
  rol: PropTypes.number.isRequired,
};
