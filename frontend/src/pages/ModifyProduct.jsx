import { useState, useEffect } from "react";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// valores iniciales del formulario
const initialValues = {
  producto: "",
  nombre: "",
  marca: "",
  stock: "",
  codigo: "",
  precio: "",
  foto: "",
  categoria: "",
  estado: "",
};

export default function ModifyProduct() {
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [productos, setProductos] = useState([]);
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
      .number()
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

  const fetchProductos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/productos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProductos(response.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

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
    fetchProductos();
    fetchCategorias();
    fetchEstados();
  }, []);

  const handleChangeProducto = async (productoId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/productos/${parseInt(productoId, 10)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const product = response.data.data[0];

      // seteando en el formulario los valores del producto seleccionado
      reset({
        nombre: product.nombre,
        marca: product.marca,
        categoria: product.CategoriaProductos_idCategoriaProductos,
        stock: product.stock,
        codigo: product.codigo,
        estado: product.Estados_idEstados,
        precio: product.precio,
        foto: product.foto,
        producto: productoId,
      });
    } catch (error) {
      console.warn(error);
    }
  };

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
      };

      const response = await axios.put(
        `http://localhost:3000/api/v1/productos/${parseInt(data.producto, 10)}`,
        dataProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setAlertMessage("¡Producto actualizado con éxito!");
        setAlertSeverity("success");
        reset(initialValues);
      }
    } catch (error) {
      setAlertMessage(
        error?.response?.data?.mensaje || "Error al actualizar producto"
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
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Modificar producto
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
              <Box padding={3} sx={{ width: "100%", height: "100%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth>
                    <InputLabel id="producto-label">Producto</InputLabel>
                    <Select
                      id="select-producto"
                      labelId="producto-label"
                      label="Producto"
                      fullWidth
                      required
                      {...register("producto")}
                      value={watch("producto")}
                      onChange={(e) => handleChangeProducto(e.target.value)}
                    >
                      {productos.map((producto) => (
                        <MenuItem
                          key={producto.idProductos}
                          value={producto.idProductos}
                        >
                          {producto.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Nombre"
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
                        label="Marca"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        fullWidth
                        {...register("marca")}
                        value={watch("marca")}
                        error={!!errors.marca}
                        helperText={errors.marca?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="categoria-label">Categoría</InputLabel>
                        <Select
                          id="select-categoria"
                          labelId="categoria-label"
                          label="Categoría"
                          required
                          {...register("categoria")}
                          value={watch("categoria")}
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
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Stock"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        {...register("stock")}
                        value={watch("stock")}
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
                        {...register("codigo")}
                        value={watch("codigo")}
                        error={!!errors.codigo}
                        helperText={errors.codigo?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="estado-label">Estado</InputLabel>
                        <Select
                          id="select-estado"
                          labelId="estado-label"
                          label="Estado"
                          fullWidth
                          {...register("estado")}
                          value={watch("estado")}
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
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label="Precio"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        {...register("precio")}
                        value={watch("precio")}
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
                    {...register("foto")}
                    value={watch("foto")}
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
                      Modificar producto
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