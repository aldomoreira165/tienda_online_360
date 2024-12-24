import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StyleIcon from "@mui/icons-material/Style";
import PersonIcon from '@mui/icons-material/Person';
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function AsideBar() {
  const [openProducts, setOpenProducts] = useState(true);
  const [openCategories, setOpenCategories] = useState(true);
  const [openUsers, setOpenUsers] = useState(true);
  const navigate = useNavigate();

  const handleClickProducts = () => {
    setOpenProducts(!openProducts);
  };

  const handleClickCategories = () => {
    setOpenCategories(!openCategories);
  };

  const handleClickUsers = () => {
    setOpenUsers(!openUsers);
  };

  const handleAddProduct = () => {
    navigate("/operator/product/add");
  };

  const handleModifyProduct = () => {
    navigate("/operator/product/modify");
  };

  const handleAddCategory = () => {
    navigate("/operator/category/add");
  };

  const handleModifyCategory = () => {
    navigate("/operator/category/modify");
  };

  const handleAddUser = () => {
    navigate("/operator/user/add");
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
      <ListItemButton onClick={handleClickProducts}>
        <ListItemIcon>
          <ProductionQuantityLimitsIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
        {openProducts ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProducts} timeout="auto" unmountOnExit>
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
      <ListItemButton onClick={handleClickCategories}>
        <ListItemIcon>
          <StyleIcon />
        </ListItemIcon>
        <ListItemText primary="Categorías" />
        {openCategories ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleAddCategory}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleModifyCategory}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickUsers}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
        {openUsers ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUsers} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleAddUser}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleModifyCategory}>
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
