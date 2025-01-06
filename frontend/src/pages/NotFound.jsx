import Box from "@mui/material/Box";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export default function NotFound() {

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: 100, color: "error" }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <h1>404</h1>
          <p>Dirección no existente</p>
        </Box>
      </Box>
    </Box>
  );
}
