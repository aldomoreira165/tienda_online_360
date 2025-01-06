import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AlertMessage from "../components/AlertMessage";

const initialValues = {
  email: "",
  telefono: "",
  nombre: "",
};

export default function FormModifyUser() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  // esquema de validacion de formulario
  const schema = yup.object().shape({
    telefono: yup
      .string()
      .max(8, "El teléfono debe tener 8 dígitos")
      .required("El teléfono es requerido"),
    nombre: yup
      .string()
      .max(100, "El nombre no debe tener más de 100 caracteres")
      .required("El nombre es requerido"),
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
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const idUsuario = decodedToken.id;

      const dataUser = {
        nombre_completo: data.nombre,
        telefono: data.telefono,
      };

      await axios.put(
        `http://localhost:3000/api/v1/usuarios/${idUsuario}`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAlertSeverity("success");
      setAlertMessage("Usuario modificado correctamente");
      setOpenAlert(true);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Error al modificar el usuario");
      setOpenAlert(true);
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const idUsuario = decodedToken.id;

      const response = await axios.get(
        `http://localhost:3000/api/v1/usuarios/${idUsuario}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      reset({
        nombre: response.data.data.nombre,
        telefono: response.data.data.telefono,
        email: response.data.data.correo,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box>
      <Box
        sx={{
          flexGrow: 1,
          height: "60vh",
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
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  margin="normal"
                  type="email"
                  fullWidth
                  disabled
                  {...register("email")}
                  value={watch("email")}
                />

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

                <TextField
                  label="Teléfono"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  fullWidth
                  {...register("telefono")}
                  value={watch("telefono")}
                  error={!!errors.telefono}
                  helperText={errors.telefono?.message}
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ marginTop: 2, width: "25%" }}
                    type="submit"
                  >
                    Modificar
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
