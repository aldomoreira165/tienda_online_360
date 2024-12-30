import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBarClient from "../components/AppBarClient";
import ProductsCatalog from "../components/ProductsCatalog";

export default function ClientDashboard() {
  return (
    <Box>
      <AppBarClient />
      <Container>
        <ProductsCatalog />
      </Container>
    </Box>
  );
}
