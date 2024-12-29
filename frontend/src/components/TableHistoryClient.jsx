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

// formateando la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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
          {row.idOrden}
        </TableCell>
        <TableCell>{formatDate(row.fechaRealizacion)}</TableCell>
        <TableCell>{formatDate(row.fechaEntrega)}</TableCell>
        <TableCell>{row.estadoNombre}</TableCell>
        <TableCell align="right">Q{row.totalOrden.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle de la orden
              </Typography>
              <Table size="small" aria-label="order history">
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detalles.map((detalle, index) => (
                    <TableRow key={index}>
                      <TableCell>{detalle.producto}</TableCell>
                      <TableCell>{detalle.marca}</TableCell>
                      <TableCell>Q{detalle.precio.toFixed(2)}</TableCell>
                      <TableCell>{detalle.cantidad}</TableCell>
                      <TableCell align="right">Q{detalle.subtotal.toFixed(2)}</TableCell>
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
    idOrden: PropTypes.number.isRequired,
    fechaRealizacion: PropTypes.string.isRequired,
    fechaEntrega: PropTypes.string.isRequired,
    estadoNombre: PropTypes.string.isRequired,
    totalOrden: PropTypes.number.isRequired,
    detalles: PropTypes.arrayOf(
      PropTypes.shape({
        producto: PropTypes.string.isRequired,
        marca: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        cantidad: PropTypes.number.isRequired,
        subtotal: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function TableHistoryClient({ ordenes }) {
  const createData = (
    idOrden,
    fechaRealizacion,
    fechaEntrega,
    totalOrden,
    estadoNombre,
    detalles
  ) => {
    return {
      idOrden,
      fechaRealizacion,
      fechaEntrega,
      estadoNombre,
      totalOrden,
      detalles: detalles.map((detalle) => ({
        producto: detalle.nombre,
        marca: detalle.marca,
        precio: detalle.precio,
        cantidad: detalle.cantidad,
        subtotal: detalle.subtotal,
      })),
    };
  };

  const rows = ordenes.map((orden) =>
    createData(
      orden.idOrden,
      orden.fecha_creacion,
      orden.fecha_entrega,
      orden.total,
      orden.estado_nombre,
      orden.detalles
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID Orden</TableCell>
            <TableCell>Fecha Creación</TableCell>
            <TableCell>Fecha Entrega</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.idOrden} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableHistoryClient.propTypes = {
  ordenes: PropTypes.arrayOf(
    PropTypes.shape({
      idOrden: PropTypes.number.isRequired,
      fecha_creacion: PropTypes.string.isRequired,
      fecha_entrega: PropTypes.string.isRequired,
      estado_nombre: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      detalles: PropTypes.arrayOf(
        PropTypes.shape({
          nombre: PropTypes.string.isRequired,
          marca: PropTypes.string.isRequired,
          precio: PropTypes.number.isRequired,
          cantidad: PropTypes.number.isRequired,
          subtotal: PropTypes.number.isRequired,
        })
      ).isRequired
    })
  ).isRequired,
};
