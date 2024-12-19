import { useState, useEffect } from "react";
import AppBarOperator from "./../components/AppBarOperator";
import AsideBar from "./../components/AsideBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AlertMessage from "./../components/AlertMessage";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

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
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

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
        console.log(response.data.data);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const handleSubmit = async () => {
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

      console.log(data);

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
                            onChange={(e) => setNombre(e.target.value)}
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
                            onChange={(e) => setMarca(e.target.value)}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <InputLabel>Categoría</InputLabel>
                          <Select
                            id="select-categoria"
                            value={categoria}
                            label="Categoría"
                            onChange={handleChangeCategoria}
                          >
                            {categorias.map((categoria) => (
                              <MenuItem key={categoria.id} value={categoria.nombre}>
                                {categoria.nombre}
                              </MenuItem>
                            ))}
                          </Select>
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
                            onChange={(e) => setStock(e.target.value)}
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
                            onChange={(e) => setCodigo(e.target.value)}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Estado"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                          />
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
                            onChange={(e) => setPrecio(e.target.value)}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        label="Foto (url)"
                        variant="outlined"
                        margin="normal"
                        type="url"
                        required
                        fullWidth
                        value={foto}
                        onChange={(e) => setFoto(e.target.value)}
                      />

                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          sx={{ marginTop: 2, width: "25%" }}
                          disabled={
                            nombre === "" ||
                            marca === "" ||
                            categoria === "" ||
                            stock === "" ||
                            codigo === "" ||
                            estado === "" ||
                            precio === "" ||
                            foto === ""
                          }
                          onClick={handleSubmit}
                        >
                          Agregar producto
                        </Button>
                      </Box>
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
