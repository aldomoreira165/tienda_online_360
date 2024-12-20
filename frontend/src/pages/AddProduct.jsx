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
import AppBarOperator from "./../components/AppBarOperator";
import AsideBar from "./../components/AsideBar";

function AddProduct() {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");
  const [codigo, setCodigo] = useState("");
  const [estado, setEstado] = useState("");
  const [precio, setPrecio] = useState("");
  const [foto, setFoto] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  // esquema de validacion de formulario
  const schema = yup.object().shape({
    name: yup.string().max(45, "Máximo 45 caracteres").required("Requerido"),
    brand: yup.string().max(45, "Máximo 45 caracteres").required("Requerido"),
    stock: yup
      .number()
      .positive("El stock debe ser positivo")
      .required("Requerido"),
    code: yup.string().max(45, "Máximo 45 caracteres").required("Requerido"),
    price: yup
      .number()
      .positive("El precio debe ser positivo")
      .required("Requerido"),
    photo: yup.string().max(255, "Máximo 255 caracteres").required("Requerido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
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
        const response = await axios.get(
          "http://localhost:3000/api/v1/estados",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const estadosProductos = response.data.data.filter(
          (estados) =>
            estados.nombre === "Activo" || estados.nombre === "Inactivo"
        );
        setEstados(estadosProductos);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchCategorias();
    fetchEstados();
  }, []);

  const onSubmit = async () => {
    try {
      const idUsuario = localStorage.getItem("idUsuario");

      let data = {
        nombre: nombre,
        marca: marca,
        categoria_id: parseInt(categoria, 10),
        stock: parseInt(stock, 10),
        codigo: codigo,
        estados_id: parseInt(estado, 10),
        precio: parseFloat(precio),
        foto: foto,
        usuario_id: parseInt(idUsuario, 10),
        fecha_creacion: new Date().toISOString(),
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/productos",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setAlertMessage("¡Producto agregado con éxito!");
        setAlertSeverity("success");
        setNombre("");
        setMarca("");
        setCategoria("");
        setStock("");
        setCodigo("");
        setEstado("");
        setPrecio("");
        setFoto("");
      }
    } catch (error) {
      setAlertMessage(
        error?.response?.data?.mensaje || "Error al agregar producto"
      );
      setAlertSeverity("error");
    }
    setOpenAlert(true);
  };

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const handleChangeEstado = (event) => {
    setEstado(event.target.value);
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
                    <FormControl
                      fullWidth
                      sx={{ height: "100%", width: "100%" }}
                    >
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              label="Nombre"
                              variant="outlined"
                              margin="normal"
                              type="text"
                              required
                              fullWidth
                              value={nombre}
                              {...register("name")}
                              onChange={(e) => setNombre(e.target.value)}
                              error={!!errors.name}
                              helperText={errors.name?.message}
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <TextField
                              label="Marca"
                              variant="outlined"
                              margin="normal"
                              type="text"
                              required
                              fullWidth
                              value={marca}
                              {...register("brand")}
                              onChange={(e) => setMarca(e.target.value)}
                              error={!!errors.brand}
                              helperText={errors.brand?.message}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <FormControl fullWidth required margin="normal">
                              <InputLabel id="categoria-label">
                                Categoría
                              </InputLabel>
                              <Select
                                id="select-categoria"
                                labelId="categoria-label"
                                value={categoria}
                                onChange={handleChangeCategoria}
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
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              label="Stock"
                              variant="outlined"
                              margin="normal"
                              type="number"
                              required
                              fullWidth
                              value={stock}
                              {...register("stock")}
                              onChange={(e) => setStock(e.target.value)}
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
                              required
                              fullWidth
                              value={codigo}
                              {...register("code")}
                              onChange={(e) => setCodigo(e.target.value)}
                              error={!!errors.code}
                              helperText={errors.code?.message}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                width: "100%",
                                position: "relative",
                                marginTop: 2,
                              }}
                            >
                              <InputLabel>Estado</InputLabel>
                              <Select
                                id="select-estado"
                                value={estado}
                                label="Estado"
                                onChange={handleChangeEstado}
                                fullWidth
                                required
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
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Precio"
                              variant="outlined"
                              margin="normal"
                              type="number"
                              required
                              fullWidth
                              value={precio}
                              {...register("price")}
                              onChange={(e) => setPrecio(e.target.value)}
                              error={!!errors.price}
                              helperText={errors.price?.message}
                            />
                          </Grid>
                        </Grid>

                        <TextField
                          label="Foto (url)"
                          variant="outlined"
                          margin="normal"
                          type="text"
                          required
                          fullWidth
                          value={foto}
                          {...register("photo")}
                          onChange={(e) => setFoto(e.target.value)}
                          error={!!errors.photo}
                          helperText={errors.photo?.message}
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

export default AddProduct;
