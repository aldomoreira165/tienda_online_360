import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useCart from "./../hooks/useCart";
import { useNavigate } from "react-router-dom";
import TableCart from "./../components/TableCart";
import AlertMessage from "./../components/AlertMessage";

export default function Cart() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();

  const validateStock = (producto) => {
    if (producto.cantidad_orden > producto.stock) {
      setAlertSeverity("error");
      setAlertMessage(
        `No hay suficiente stock de ${producto.nombre}. Stock disponible: ${producto.stock}`
      );
      setOpenAlert(true);
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    // validando stock de productos
    const isValid = cart.every(validateStock);

    if (!isValid) {
      return;
    }

    navigate("/client/cart/confirm");
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 15 }}>
      <Typography variant="h6" component="h6" gutterBottom align="center">
        Carrito de compras
      </Typography>
      <Box marginTop={4} marginInline={10}>
        <TableCart />
      </Box>
      <Box marginInline={10}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: 4 }}
            onClick={handleConfirm}
            disabled={cart.length === 0}
          >
            Confirmar compra
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{ marginTop: 4, marginLeft: 2 }}
            onClick={clearCart}
          >
            Rechazar
          </Button>
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
