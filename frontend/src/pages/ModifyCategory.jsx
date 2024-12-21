import { useState, useEffect } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AppBarOperator from "./../components/AppBarOperator";
import AsideBar from "./../components/AsideBar";
import AlertMessage from "./../components/AlertMessage";

const initialValues = {
  categoria: "",
  nombre: "",
  estado: "",
};

export default function ModifyCategory() {
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  const schema = yup.object().shape({
    nombre: yup
      .string()
      .max(45, "La categoría no debe exceder los 45 caracteres")
      .required("El nombre es requerido"),
    estado: yup.number().required("El estado es requerido"),
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

  // Fetch categorías y estados
  const fetchCategorias = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/categorias",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategorias(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/estados", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const estadosCategoria = response.data.data.filter(
        (cat) => cat.idEstados === 1 || cat.idEstados === 2
      );
      setEstados(estadosCategoria);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchEstados();
  }, []);

  const handleCategoriaChange = async (idCategoria) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/categorias/${parseInt(idCategoria, 10)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const categoriaEncontrada = response.data.data[0];

      reset({
        nombre: categoriaEncontrada.nombre,
        estado: categoriaEncontrada.Estados_idEstados,
        categoria: idCategoria,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const dataCategory = {
        nombre: data.nombre,
        estado_id: data.estado,
      };

      const response = await axios.put(
        `http://localhost:3000/api/v1/categorias/${parseInt(
          data.categoria,
          10
        )}`,
        dataCategory,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage("Categoría modificada correctamente");
        setOpenAlert(true);
        reset(initialValues);
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(
        error?.response?.data?.mensaje ||
          "Ocurrió un error al modificar la categoría"
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
              <Typography variant="h6" align="center" gutterBottom>
                Modificar categoría
              </Typography>
              <Box
                sx={{ padding: 4, display: "flex", justifyContent: "center" }}
              >
                <Paper elevation={4} sx={{ width: "100%", padding: 3 }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="categoria-label">Categoría</InputLabel>
                      <Select
                        id="select-categoria"
                        labelId="categoria-label"
                        label="Categoría"
                        {...register("categoria")}
                        value={watch("categoria")}
                        onChange={(e) => handleCategoriaChange(e.target.value)}
                      >
                        {categorias.map((categoria) => (
                          <MenuItem
                            key={categoria.idCategoriaProductos}
                            value={categoria.idCategoriaProductos}
                          >
                            {categoria.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Nombre"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      {...register("nombre")}
                      value={watch("nombre")}
                      error={!!errors.nombre}
                      helperText={errors.nombre?.message}
                    />

                    <FormControl fullWidth margin="normal">
                      <InputLabel id="estado-label">Estado</InputLabel>
                      <Select
                        id="select-estado"
                        labelId="estado-label"
                        label="Estado"
                        {...register("estado")}
                        value={watch("estado")}
                      >
                        {estados.map((estado) => (
                          <MenuItem
                            key={estado.idEstados}
                            value={estado.idEstados}
                          >
                            {estado.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ marginTop: 2, width: "25%" }}
                        type="submit"
                      >
                        Modificar categoría
                      </Button>
                    </Box>
                  </form>
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
