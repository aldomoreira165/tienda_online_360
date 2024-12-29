import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import InventoryIcon from "@mui/icons-material/Inventory";
import SellIcon from "@mui/icons-material/Sell";
import PublicIcon from "@mui/icons-material/Public";
import useCart from "./../hooks/useCart";

function CardProduct({ producto }) {

  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((p) => p.idProductos === product.idProductos);
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={producto.foto} title={producto.nombre} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {producto.stock > 0 ? (
              producto.nombre
            ) : (
              <Badge
                badgeContent="Agotado"
                color="error"
                sx={{ marginLeft: 1 }}
              >
                {producto.nombre}
              </Badge>
            )}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <PublicIcon />
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Marca: {producto.marca}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <InventoryIcon />
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Stock: {producto.stock}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <SellIcon />
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Precio: ${producto.precio}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
        {checkProductInCart(producto) ? (
          <Button 
            size="small" 
            color="error"
            onClick={() => removeFromCart(producto)}
          >
            Remover del carrito
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={() => addToCart(producto)}
            disabled={producto.stock === 0}
          >
            Agregar al carrito
          </Button>
        )}
        </CardActions>
      </Card>
    </Grid>
  );
}

CardProduct.propTypes = {
  producto: PropTypes.object.isRequired,
};

export default CardProduct;
