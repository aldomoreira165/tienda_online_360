import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBarOperator from "./../components/AppBarOperator";
import AsideBar from "./../components/AsideBar";
import AlertMessage from "./../components/AlertMessage";

export default function AddCategory() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .max(45, "La categoría no debe exceder los 45 caracteres")
      .required("El nombre es requerido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const dataCategory = {
        usuario_id: localStorage.getItem("idUsuario"),
        nombre: data.name,
        estado_id: 1,
        fecha_creacion: new Date().toISOString(),
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/categorias",
        dataCategory,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage("Categoría agregada correctamente");
        setOpenAlert(true);
        reset();
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(
        error?.response?.data?.message ||
          "Ocurrió un error al agregar la categoría"
      );
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ height: "calc(100vh - 96px)", width: "100%" }}>
      <AppBarOperator />
      <Box
        sx={{ marginTop: "96px", height: "calc(100vh - 96px)", width: "100%" }}
      >
        <Grid container spacing={0} sx={{ height: "100%", width: "100%" }}>
          <Grid
            item
            xs={2}
            sx={{ height: "100%", borderRight: "1px solid #ccc" }}
          >
            <AsideBar />
          </Grid>
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
                  Agregar categoría
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
                        <TextField
                          label="Nombre"
                          variant="outlined"
                          margin="normal"
                          type="text"
                          fullWidth
                          {...register("name")}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />

                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ marginTop: 2, width: "25%" }}
                            type="submit"
                          >
                            Agregar categoría
                          </Button>
                        </Box>
                      </form>
                    </FormControl>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>
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
