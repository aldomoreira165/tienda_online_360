import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AlertMessage from "../components/AlertMessage";

const initialValues = {
  email: "",
  telefono: "",
  razon_social: "",
  nombre_comercial: "",
  direccion_entrega: "",
};

export default function FormClient() {
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
    telefono: yup
      .string()
      .max(8, "El teléfono debe tener 8 dígitos")
      .required("El teléfono es requerido"),
    razon_social: yup
      .string()
      .max(245, "La razón social no debe tener más de 245 caracteres")
      .required("La razón social es requerida"),
    nombre_comercial: yup
      .string()
      .max(100, "El nombre comercial no debe tener más de 100 caracteres")
      .required("El nombre comercial es requerido"),
    direccion_entrega: yup
      .string()
      .max(100, "La dirección de entrega no debe tener más de 100 caracteres")
      .required("La dirección de entrega es requerida"),
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

  const onSubmit = async (data) => {
    try {
      const dataClient = {
        razon_social: data.razon_social,
        nombre_comercial: data.nombre_comercial,
        direccion_entrega: data.direccion_entrega,
        telefono: data.telefono,
        email: data.email,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/clientes",
        dataClient
      );

      if (response.status === 201 || response.status === 200) {
        setAlertMessage("¡Usuario registrado con éxito!");
        setAlertSeverity("success");
        setOpenAlert(true);
        reset();
      } else {
        setAlertMessage("Algo salió mal. Inténtalo de nuevo.");
        setAlertSeverity("error");
        setOpenAlert(true);
        reset(initialValues);
      }
    } catch (error) {
      setAlertMessage(
        error?.response?.data?.mensaje || "Error al registrar el usuario."
      );
      setAlertSeverity("error");
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
          height: "75vh",
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
                      label="Razón social"
                      variant="outlined"
                      margin="normal"
                      type="text"
                      fullWidth
                      {...register("razon_social")}
                      value={watch("razon_social")}
                      error={!!errors.razon_social}
                      helperText={errors.razon_social?.message}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Nombre comercial"
                      variant="outlined"
                      margin="normal"
                      type="text"
                      fullWidth
                      {...register("nombre_comercial")}
                      value={watch("nombre_comercial")}
                      error={!!errors.nombre_comercial}
                      helperText={errors.nombre_comercial?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
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

                  <Grid item xs={6}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      {...register("email")}
                      value={watch("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Dirección de entrega"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  fullWidth
                  {...register("direccion_entrega")}
                  value={watch("direccion_entrega")}
                  error={!!errors.direccion_entrega}
                  helperText={errors.direccion_entrega?.message}
                />

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
