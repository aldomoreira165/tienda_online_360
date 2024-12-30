import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StyleIcon from "@mui/icons-material/Style";
import PersonIcon from "@mui/icons-material/Person";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HistoryIcon from '@mui/icons-material/History';
import CheckIcon from '@mui/icons-material/Check';

export default function AsideBar() {
  const [openProducts, setOpenProducts] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openClients, setOpenClients] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
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

  const handleClickClients = () => {
    setOpenClients(!openClients);
  };

  const handleClickOrders = () => {
    setOpenOrders(!openOrders);
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

  const handleActiveUser = () => {
    navigate("/operator/user/active");
  };

  const handleInactiveUser = () => {
    navigate("/operator/user/inactive");
  };

  const handleAddClient = () => {
    navigate("/operator/client/add");
  };

  const handleModifyClient = () => {
    navigate("/operator/client/modify");
  };

  const handleConfirmOrders = () => {
    navigate("/operator/order/confirm");
  };

  const handleHistoryOrders = () => {
    navigate("/operator");
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
          <ListItemButton sx={{ pl: 4 }} onClick={handleActiveUser}>
            <ListItemIcon>
              <ToggleOnIcon />
            </ListItemIcon>
            <ListItemText primary="Activar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleInactiveUser}>
            <ListItemIcon>
              <ToggleOffIcon />
            </ListItemIcon>
            <ListItemText primary="Desactivar" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickClients}>
        <ListItemIcon>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
        {openClients ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openClients} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleAddClient}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleModifyClient}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickOrders}>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Pedidos" />
        {openOrders ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openOrders} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleConfirmOrders}>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Confirmar pedidos" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleHistoryOrders}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Historial de pedidos" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
