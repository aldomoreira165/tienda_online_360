import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
import AlertMessage from "./../components/AlertMessage";
import logo from "./../assets/images/tiendita_logo.jpg";
import slide1 from "./../assets/images/slide1.jpg";
import slide2 from "./../assets/images/slide2.jpg";
import slide3 from "./../assets/images/slide3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../assets/css/main.css";

export default function Login() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  // esquema de validación de formulario
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Correo electrónico no válido")
      .required("Correo electrónico requerido"),
    password: yup
      .string()
      .required("Contraseña requerida"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const photos = [{ url: slide1 }, { url: slide2 }, { url: slide3 }];

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          correo_electronico: data.email,
          contraseña: data.password,
        }
      );

      const { id, rol, estado, correo } = response.data.data;
      const token = response.data.token;

      // seteando alerta
      setAlertSeverity("success");
      setAlertMessage("Inicio de sesión exitoso. Redirigiendo...");
      setOpenAlert(true);

      if (rol === 1 && estado === 1) {
        setTimeout(() => navigate("/client"), 2000);
        localStorage.setItem("token", token);
        localStorage.setItem("idUsuario", id);
        localStorage.setItem("rolUsuario", rol);
        localStorage.setItem("emailUsuario", correo);
      } else if (rol === 2 && estado === 1) {
        setTimeout(() => navigate("/operator"), 2000);
        localStorage.setItem("token", token);
        localStorage.setItem("idUsuario", id);
        localStorage.setItem("rolUsuario", rol);
        localStorage.setItem("emailUsuario", correo);
      } else {
        setAlertSeverity("warning");
        setAlertMessage("No se reconoce el rol del usuario.");
        setOpenAlert(true);
        console.warn("No existe el rol");
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(
        error.response?.data?.mensaje ||
          "Error al iniciar sesión. Verifica tus credenciales."
      );
      setOpenAlert(true);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup/clients");
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // configs para el slider de imagenes
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
    <Box sx={{ flexGrow: 1, height: "100vh", overflow: "hidden" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={7} sx={{ height: "100%" }}>
          <Box sx={{ height: "100%", width: "100%" }}>
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

        <Grid item xs={5} sx={{ height: "100%" }}>
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

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  label="Contraseña"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  required
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  type="submit"
                >
                  Iniciar Sesión
                </Button>
              </form>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignUpClick}
                sx={{ marginTop: 2 }}
              >
                Registrarse
              </Button>
            </Paper>
          </Box>
        </Grid>
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
