import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AppBarBack({ url }) {
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (url) {
      navigate(url);
    } else {
      console.warn("No URL provided");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ArrowBackIcon 
            onClick={handleIconClick} 
            sx={{ cursor: "pointer" }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

AppBarBack.propTypes = {
  url: PropTypes.string.isRequired,
};
