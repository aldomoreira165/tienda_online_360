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
                History
              </Typography>
              <Table size="small" aria-label="order history">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
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
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
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
    estadoNombre
  ) => {
    return {
      idOrden,
      fechaRealizacion,
      fechaEntrega,
      estadoNombre,
      totalOrden,
      history: [
        {
          date: "2020-01-05",
          customerId: "11091700",
          amount: 3,
        },
        {
          date: "2020-01-02",
          customerId: "Anonymous",
          amount: 1,
        },
      ],
    };
  };

  const rows = ordenes.map((orden) =>
    createData(
      orden.idOrden,
      orden.fecha_creacion,
      orden.fecha_entrega,
      orden.total,
      orden.estado_nombre
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
            <TableCell align="right">Total ($)</TableCell>
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
    })
  ).isRequired,
};
