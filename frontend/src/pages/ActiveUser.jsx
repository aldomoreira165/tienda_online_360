import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AlertMessage from "./../components/AlertMessage";

// valores iniciales del formulario
const initialValues = {
  usuario: "",
};

export default function ActiveUser() {
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  // configuraciones de validacion de formulario
  const schema = yup.object().shape({
    usuario: yup.string().required("El usuario es requerido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  // Fetch usuarios inactivos
  const fetchInactiveUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/usuarios/inactivos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setInactiveUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInactiveUsers();
  }, []);

  const onSubmit = async (data) => {
    try {

      const idUsuario = data.usuario;

      const response = await axios.put(
        `http://localhost:3000/api/v1/usuarios/activar/${parseInt(idUsuario, 10)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage("Usuario activado correctamente");
        setOpenAlert(true);
        reset(initialValues);
        fetchInactiveUsers();
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error?.response?.data?.mensaje || "Ocurrió un error");
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
            <Box>
              <Box marginTop={6}>
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  align="center"
                >
                  Activar usuario
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
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="usuario-label">
                            Usuarios inactivos
                          </InputLabel>
                          <Select
                            id="select-usuario"
                            labelId="usuario-label"
                            label="Usuarios inactivos"
                            {...register("usuario")}
                            value={watch("usuario")}
                            error={!!errors.usuario}
                          >
                            {inactiveUsers.map((inactiveUser) => (
                              <MenuItem
                                key={inactiveUser.idUsuarios}
                                value={inactiveUser.idUsuarios}
                              >
                                {inactiveUser.nombre_completo} (
                                {inactiveUser.correo_electronico})
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.usuario && (
                            <Typography variant="caption" color="error">
                              {errors.usuario.message}
                            </Typography>
                          )}
                        </FormControl>

                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ marginTop: 2, width: "25%" }}
                            type="submit"
                          >
                            Activar
                          </Button>
                        </Box>
                      </form>
                    </FormControl>
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
