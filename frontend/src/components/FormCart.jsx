import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AlertMessage from "../components/AlertMessage";
import useCart from "./../hooks/useCart";
import { useNavigate } from "react-router-dom";

const initialValues = {
  correo_electronico: "",
  telefono: "",
  nombre: "",
  direccion: "",
  fecha_entrega: "",
};

export default function FormCart() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const { cart, totalCart, clearCart } = useCart();

  // esquema de validacion de formulario
  const schema = yup.object().shape({
    correo_electronico: yup
      .string()
      .email("Correo electrónico no válido")
      .max(50, "El correo electrónico no debe tener más de 50 caracteres")
      .required("Correo electrónico requerido"),
    telefono: yup
      .string()
      .max(8, "El teléfono debe tener 8 dígitos")
      .required("El teléfono es requerido"),
    nombre: yup
      .string()
      .max(100, "El nombre no debe tener más de 100 caracteres")
      .required("El nombre es requerido"),
    direccion: yup
      .string()
      .max(100, "La dirección no debe tener más de 100 caracteres")
      .required("La dirección es requerida"),
    fecha_entrega: yup.date().required("La fecha de entrega es requerida"),
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

  const validateStock = (producto) => {
    if (producto.cantidad_orden > producto.stock) {
      setAlertSeverity("error");
      setAlertMessage(`No hay suficiente stock de ${producto.nombre}. Stock disponible: ${producto.stock}`);
      setOpenAlert(true);
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      const idUsuario = localStorage.getItem("idUsuario");
      const estadoCompra = 15;
      const nombreCompleto = data.nombre;
      const direccion = data.direccion;
      const telefono = data.telefono;
      const correo_eletronico = data.correo_electronico;
      const fechaEntrega = data.fecha_entrega;
      const totalOrden = totalCart;

      const detalles = cart.map((producto) => ({
        Productos_idProductos: producto.idProductos,
        cantidad: producto.cantidad_orden,
      }));

      const dataOrden = {
        Usuarios_idUsuarios: idUsuario,
        Estados_idEstados: estadoCompra,
        nombre_completo: nombreCompleto,
        direccion: direccion,
        telefono: telefono,
        correo_electronico: correo_eletronico,
        fecha_entrega: fechaEntrega,
        total_orden: totalOrden,
        detalles: detalles,
      };

      // validando stock de productos
      const isValid = cart.every(validateStock);

      if (!isValid) {
        return;
      }

      // reduciendo stock de productos
      cart.forEach(async (producto) => {
        const dataStock = {
          cantidad: parseInt(producto.cantidad_orden),
        };

        const idProducto = producto.idProductos;

        await axios.put(
          `http://localhost:3000/api/v1/productos/reducirStock/${idProducto}`,
          dataStock,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      });

      const response = await axios.post(
        "http://localhost:3000/api/v1/ordenes",
        dataOrden,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setAlertSeverity("success");
        setAlertMessage("Orden confirmada exitosamente");
        setOpenAlert(true);
        reset(initialValues);

        clearCart();

        setTimeout(() => {
          navigate("/client");
        }, 3000);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Algo salió mal. Inténtalo de nuevo.");
        setOpenAlert(true);
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error.response.data.message);
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box>
      <Box
        sx={{
          flexGrow: 1,
          height: "55vh",
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Correo electrónico"
                      variant="outlined"
                      margin="normal"
                      type="email"
                      fullWidth
                      {...register("correo_electronico")}
                      value={watch("correo_electronico")}
                      error={!!errors.correo_electronico}
                      helperText={errors.correo_electronico?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Teléfono"
                      variant="outlined"
                      margin="normal"
                      type="tel"
                      fullWidth
                      {...register("telefono")}
                      value={watch("telefono")}
                      error={!!errors.telefono}
                      helperText={errors.telefono?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      type="date"
                      fullWidth
                      {...register("fecha_entrega")}
                      value={watch("fecha_entrega")}
                      error={!!errors.fecha_entrega}
                      helperText={errors.fecha_entrega?.message}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Dirección de entrega"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    fullWidth
                    {...register("direccion")}
                    value={watch("direccion")}
                    error={!!errors.direccion}
                    helperText={errors.direccion?.message}
                  />
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ marginTop: 2, width: "25%" }}
                    type="submit"
                  >
                    Confirmar compra
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
