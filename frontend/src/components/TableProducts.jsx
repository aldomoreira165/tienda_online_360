import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableProducts({ productos }) {
  function createData(
    idProducto,
    codigoProducto,
    nombreProducto,
    marcaProducto,
    stockProducto,
    precioProducto,
    estadoProducto,
    categoriaProducto
  ) {
    return {
        idProducto,
        codigoProducto,
        nombreProducto,
        marcaProducto,
        stockProducto,
        precioProducto,
        estadoProducto,
        categoriaProducto,
    };
  }

  const rows = productos.map((producto) =>
    createData(
        producto.idProductos,
        producto.codigo,
        producto.nombre,
        producto.marca,
        producto.stock,
        producto.precio,
        producto.nombre_estado,
        producto.nombre_categoria
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Categoría</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.idProducto}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.codigoProducto}
              </TableCell>
                <TableCell>{row.nombreProducto}</TableCell>
                <TableCell>{row.marcaProducto}</TableCell>
                <TableCell>{row.stockProducto}</TableCell>
                <TableCell>Q{row.precioProducto.toFixed(2)}</TableCell>
                <TableCell>{row.estadoProducto}</TableCell>
                <TableCell>{row.categoriaProducto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableProducts.propTypes = {
    productos: PropTypes.arrayOf(
        PropTypes.shape({
        idProductos: PropTypes.number,
        codigo: PropTypes.string,
        nombre: PropTypes.string,
        marca: PropTypes.string,
        stock: PropTypes.number,
        precio: PropTypes.number,
        estadoProducto: PropTypes.string,
        categoriaProducto: PropTypes.string,
        })
    ),
}