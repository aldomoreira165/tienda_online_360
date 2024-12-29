import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AlertMessage from "./../components/AlertMessage";

// valores iniciales del formulario
const initialValues = {
    email: "",
    telefono: "",
    razon_social: "",
    nombre_comercial: "",
    direccion_entrega: "",
};

export default function AddClient() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  // configuraciones de validacion de formulario
  const schema = yup.object().shape({
    email: yup
        .string()
        .email("Correo electrónico no válido")
        .max(50, "El correo electrónico no debe tener más de 50 caracteres")
        .required("El correo electrónico es requerido"),
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
      let dataClient = {
        razon_social: data.razon_social,
        nombre_comercial: data.nombre_comercial,
        direccion_entrega: data.direccion_entrega,
        telefono: data.telefono,
        email: data.email,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/clientes",
        dataClient,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setAlertMessage("Cliente agregado con éxito!");
        setAlertSeverity("success");
        reset(initialValues);
      }
    } catch (error) {
      setAlertMessage(
        error?.response?.data?.mensaje || "Error al agregar cliente"
      );
      setAlertSeverity("error");
    }
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
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
                  Agregar cliente
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Razón social"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            fullWidth
                            value={watch("razon_social")}
                            {...register("razon_social")}
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
                            value={watch("nombre_comercial")}
                            {...register("nombre_comercial")}
                            error={!!errors.nombre_comercial}
                            helperText={errors.nombre_comercial?.message}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            type="email"
                            fullWidth
                            value={watch("email")}
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            label="Teléfono"
                            variant="outlined"
                            margin="normal"
                            type="tel"
                            fullWidth
                            value={watch("telefono")}
                            {...register("telefono")}
                            error={!!errors.telefono}
                            helperText={errors.telefono?.message}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        label="Dirección de entrega"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        fullWidth
                        value={watch("direccion_entrega")}
                        {...register("direccion_entrega")}
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
                          Agregar cliente
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Grid>
      <AlertMessage
        openAlert={openAlert}
        closeAlert={handleCloseAlert}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
      />
    </Box>
  );
}