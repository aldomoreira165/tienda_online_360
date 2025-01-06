import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormUser from "./../components/FormUser";

export default function AddUser() {
  const [rol, setRol] = useState(1);

  const handleChangeRol = (event) => {
    const rol = parseInt(event.target.value);
    setRol(rol);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Agregar usuario
            </Typography>
          </Box>
          <Box paddingInline={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="rol-label">Rol</InputLabel>
              <Select
                id="select-rol"
                labelId="rol-label"
                label="Rol"
                fullWidth
                required
                value={rol}
                onChange={handleChangeRol}
              >
                <MenuItem value="1">Cliente</MenuItem>
                <MenuItem value="2">Operador</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormUser rol={rol} />
        </Box>
      </Grid>
    </Box>
  );
}
