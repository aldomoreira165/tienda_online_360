import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";

function CardProduct(props) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.foto}
          title={props.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.stock > 0 ? (
              props.nombre
            ) : (
              <Badge
                badgeContent="Agotado"
                color="error"
                sx={{ marginLeft: 1 }}
              >
                {props.nombre}
              </Badge>
            )}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Agregar al carrito</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardProduct;
