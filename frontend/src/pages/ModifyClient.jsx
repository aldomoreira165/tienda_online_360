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
  cliente: "",
  email: "",
  telefono: "",
  razon_social: "",
  nombre_comercial: "",
  direccion_entrega: "",
  estado: "",
};

function ModifyClient() {
  const [clientes, setClientes] = useState([]);
  const [estados, setEstados] = useState([]);
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

  const fetchClientes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/clientes",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setClientes(response.data.data);
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

      const estadosCliente = response.data.data.filter(e => e.nombre === "Activo" || e.nombre === "Inactivo");
      setEstados(estadosCliente);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEstados();
    fetchClientes();
  }, []);

  const handleChangeCliente = async (clienteId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/clientes/${parseInt(clienteId, 10)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const client = response.data.data[0];

      reset({
        cliente: client.idClientes,
        email: client.email,
        telefono: client.telefono,
        razon_social: client.razon_social,
        nombre_comercial: client.nombre_comercial,
        direccion_entrega: client.direccion_entrega,
        estado: client.Estados_idEstados,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      let dataClient = {
        razon_social: data.razon_social,
        nombre_comercial: data.nombre_comercial,
        direccion_entrega: data.direccion_entrega,
        telefono: data.telefono,
        correo_electronico: data.email,
        estado_id: parseInt(data.estado, 10),
      };

      const response = await axios.put(
        `http://localhost:3000/api/v1/clientes/${parseInt(data.cliente, 10)}`,
        dataClient,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setAlertMessage("Cliente actualizado con éxito");
        setAlertSeverity("success");
        reset(initialValues);
        fetchClientes();
      }
    } catch (error) {
      setAlertMessage(
        error?.response?.data?.mensaje || "Error al actualizar cliente"
      );
      setAlertSeverity("error");
    }
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <Box>
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Modificar cliente
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
                  <FormControl fullWidth>
                    <InputLabel id="cliente-label">Cliente</InputLabel>
                    <Select
                      id="select-cliente"
                      labelId="cliente-label"
                      label="Cliente"
                      fullWidth
                      required
                      {...register("cliente")}
                      value={watch("cliente")}
                      onChange={(e) => handleChangeCliente(e.target.value)}
                    >
                      {clientes.map((cliente) => (
                        <MenuItem
                          key={cliente.idClientes}
                          value={cliente.idClientes}
                        >
                          {cliente.razonSocial} - {cliente.nombreComercial}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
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
                      Modificar cliente
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

export default ModifyClient;
