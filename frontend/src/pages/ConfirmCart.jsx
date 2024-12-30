import FormCart from "./../components/FormCart"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function ConfirmCart() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 15 }}>
        <Typography variant="h6" component="h6" gutterBottom align="center">
            Confirmar compra
        </Typography>
        <Box>
            <FormCart />
        </Box>
    </Box>
  )
}
