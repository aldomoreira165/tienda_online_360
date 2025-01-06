import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.idClientes}
        </TableCell>
        <TableCell>{row.razonSocial}</TableCell>
        <TableCell>{row.nombreComercial}</TableCell>
        <TableCell>{row.direccionEntrega}</TableCell>
        <TableCell>{row.telefono}</TableCell>
        <TableCell>{row.correoElectronico}</TableCell>
        <TableCell>{row.nombreEstado}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle de usuarios asociados
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID Usuario</TableCell>
                    <TableCell>Email Usuario</TableCell>
                    <TableCell>Nombre Usuario</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.usuarios.map((usuario, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {usuario.usuarioId}
                      </TableCell>
                      <TableCell>{usuario.usuarioEmail}</TableCell>
                      <TableCell>{usuario.usuarioNombre}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    idClientes: PropTypes.number.isRequired,
    razonSocial: PropTypes.string.isRequired,
    nombreComercial: PropTypes.string.isRequired,
    direccionEntrega: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    correoElectronico: PropTypes.string.isRequired,
    nombreEstado: PropTypes.string.isRequired,
    usuarios: PropTypes.arrayOf(
      PropTypes.shape({
        usuarioId: PropTypes.number.isRequired,
        usuarioEmail: PropTypes.string.isRequired,
        usuarioNombre: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function TableClients({ clientes }) {
  function createData(
    idClientes,
    razonSocial,
    nombreComercial,
    direccionEntrega,
    telefono,
    correoElectronico,
    nombreEstado,
    usuarios
  ) {
    return {
      idClientes,
      razonSocial,
      nombreComercial,
      direccionEntrega,
      telefono,
      correoElectronico,
      nombreEstado,
      usuarios: usuarios.map((usuario) => ({
        usuarioId: usuario.idUsuario,
        usuarioEmail: usuario.correoUsuario,
        usuarioNombre: usuario.nombreUsuario,
      })),
    };
  }

  const rows = clientes.map((cliente) =>
    createData(
      cliente.idClientes,
      cliente.razonSocial,
      cliente.nombreComercial,
      cliente.direccionEntrega,
      cliente.telefono,
      cliente.correoElectronico,
      cliente.nombreEstado,
      cliente.usuarios
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID Cliente</TableCell>
            <TableCell>Razón social</TableCell>
            <TableCell>Nombre comercial</TableCell>
            <TableCell>Dirección entrega</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.idClientes} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableClients.propTypes = {
  clientes: PropTypes.arrayOf(
    PropTypes.shape({
      idClientes: PropTypes.number.isRequired,
      razonSocial: PropTypes.string.isRequired,
      nombreComercial: PropTypes.string.isRequired,
      direccionEntrega: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      correoElectronico: PropTypes.string.isRequired,
      nombreEstado: PropTypes.string.isRequired,
      usuarios: PropTypes.arrayOf(
        PropTypes.shape({
          idUsuario: PropTypes.number.isRequired,
          correoUsuario: PropTypes.string.isRequired,
          nombreUsuario: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
