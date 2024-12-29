import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableCart from "./../components/TableCart";
import useCart from "./../hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  
  const { cart, clearCart } = useCart();

  const handleConfirm = () => {
    navigate("/client/cart/confirm");
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
    </Box>
  );
}
