import { useState } from "react";

import {
  Paper,
  TextField,
  Box,
  Button,
  Grid,
  CssBaseline,
} from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import logo from "./../assets/images/tiendita_logo.jpg";
import slide1 from "./../assets/images/slide1.jpg";
import slide2 from "./../assets/images/slide2.jpg";
import slide3 from "./../assets/images/slide3.jpg";
import "./../assets/css/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const photos = [{ url: slide1 }, { url: slide2 }, { url: slide3 }];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async() => {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
            correo_electronico: email,
            contraseña: password
        })

        // mostrar respuesta en consola en formato JSON
        console.log(response.data.token);
    } catch (error) {
        console.log(error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <CssBaseline />
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={7}>
          <Box sx={{ height: "100%" }}>
            <Slider {...settings}>
              {photos.map((photo, index) => (
                <Box
                  key={index}
                  sx={{
                    height: "100vh",
                    backgroundImage: `url(${photo.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Box>
              ))}
            </Slider>
          </Box>
        </Grid>

        <Grid item xs={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Paper
              elevation={8}
              sx={{ padding: 4, width: "80%", maxWidth: 400, borderRadius: 4 }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img className="logo" src={logo} alt="logo"></img>
              </Box>

              <TextField
                label="Correo electrónico"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                margin="normal"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleSubmit}
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Registrarse
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
