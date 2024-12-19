import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export default function AsideBar() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAddProduct = () => {
    navigate("/operator/product/add");
  };

  const handleModifyProduct = () => {
    navigate("/operator/product/modify");
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Acciones de operador
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ProductionQuantityLimitsIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleAddProduct}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleModifyProduct}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
