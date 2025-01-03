import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableCategories({ categorias }) {
  function createData(idCategoria, nombreCategoria, nombreEstado) {
    return { idCategoria, nombreCategoria, nombreEstado };
  }

  const rows = categorias.map((categoria) =>
    createData(
      categoria.idCategoriaProductos,
      categoria.nombre,
      categoria.nombre_estado
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.idCategoria}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idCategoria}
              </TableCell>
              <TableCell>{row.nombreCategoria}</TableCell>
              <TableCell>{row.nombreEstado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableCategories.propTypes = {
  categorias: PropTypes.arrayOf(
    PropTypes.shape({
      idCategoriaProductos: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      nombre_estado: PropTypes.string.isRequired,
    })
  ).isRequired,
};