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
import AlertMessage from "./../components/AlertMessage";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

// valores iniciales del formulario
const initialValues = {
  nombre: "",
  marca: "",
  stock: "",
  codigo: "",
  precio: "",
  foto: "",
  categoria: "",
  estado: "",
};

export default function AddProduct() {
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  // configuraciones de validacion de formulario
  const schema = yup.object().shape({
    nombre: yup
      .string()
      .max(45, "Máximo 45 caracteres")
      .required("El nombre es requerido"),
    marca: yup
      .string()
      .max(45, "Máximo 45 caracteres")
      .required("La marca es requerida"),
    stock: yup
      .number("El stock debe ser un número")
      .positive("El stock debe ser positivo")
      .required("El stock es requerido"),
    codigo: yup
      .string()
      .max(45, "Máximo 45 caracteres")
      .required("El código es requerido"),
    precio: yup
      .number()
      .positive("El precio debe ser positivo")
      .required("El precio es requerido"),
    foto: yup
      .string()
      .max(255, "Máximo 255 caracteres")
      .required("La foto es requerida"),
    categoria: yup.number().required("La categoría es requerida"),
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
      const categoriasActivas = response.data.data.filter(cat => cat.Estados_idEstados === 1);
      setCategorias(categoriasActivas);
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/estados", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const estadosProductos = response.data.data.filter(
        (estados) =>
          estados.nombre === "Activo" || estados.nombre === "Inactivo"
      );
      setEstados(estadosProductos);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchEstados();
  }, []);

  const onSubmit = async (data) => {
    try {
      let dataProduct = {
        nombre: data.nombre,
        marca: data.marca,
        categoria_id: parseInt(data.categoria, 10),
        stock: parseInt(data.stock, 10),
        codigo: data.codigo,
        estados_id: parseInt(data.estado, 10),
        precio: parseFloat(data.precio, 10),
        foto: data.foto,
        fecha_creacion: new Date().toISOString(),
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/productos",
        dataProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setAlertMessage("¡Producto agregado con éxito!");
        setAlertSeverity("success");
        reset(initialValues);
      }
    } catch (error) {
      setAlertMessage(
        error?.response?.data?.mensaje || "Error al agregar producto"
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
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Agregar producto
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
                        label="Nombre"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        fullWidth
                        value={watch("nombre")}
                        {...register("nombre")}
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label="Marca"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        fullWidth
                        value={watch("marca")}
                        {...register("marca")}
                        error={!!errors.marca}
                        helperText={errors.marca?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ width: "100%", position: "relative" }}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="categoria-label">
                            Categoría
                          </InputLabel>
                          <Select
                            id="select-categoria"
                            labelId="categoria-label"
                            label="Categoría"
                            required
                            value={watch("categoria")}
                            {...register("categoria")}
                            error={!!errors.categoria}
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
                          {errors.categoria && (
                            <Typography variant="caption" color="error">
                              {errors.categoria.message}
                            </Typography>
                          )}
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Stock"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        required
                        value={watch("stock")}
                        {...register("stock")}
                        error={!!errors.stock}
                        helperText={errors.stock?.message}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Código"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        fullWidth
                        value={watch("codigo")}
                        {...register("codigo")}
                        error={!!errors.codigo}
                        helperText={errors.codigo?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="estado-label">Estado</InputLabel>
                          <Select
                            id="select-estado"
                            labelId="estado-label"
                            label="Estado"
                            fullWidth
                            required
                            value={watch("estado")}
                            {...register("estado")}
                            error={!!errors.estado}
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
                          {errors.estado && (
                            <Typography variant="caption" color="error">
                              {errors.estado?.message}
                            </Typography>
                          )}
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Precio"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        required
                        value={watch("precio")}
                        {...register("precio")}
                        error={!!errors.precio}
                        helperText={errors.precio?.message}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Foto (url)"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    fullWidth
                    value={watch("foto")}
                    {...register("foto")}
                    error={!!errors.foto}
                    helperText={errors.foto?.message}
                  />

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      sx={{ marginTop: 2, width: "25%" }}
                      type="submit"
                    >
                      Agregar producto
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