import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useCart from "./../hooks/useCart";

export default function TableCart() {
  const { cart, incrementProduct, decrementProduct, setTotalCart } = useCart();

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function createRow(desc, qty, unit, id) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price, id };
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = cart.map((producto) =>
    createRow(
      producto.nombre,
      producto.cantidad_orden,
      producto.precio,
      producto.idProductos
    )
  );

  const totalPrice = subtotal(rows);

  useEffect(() => {
    setTotalCart(totalPrice);
  }, [totalPrice, setTotalCart]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Detalle
            </TableCell>
            <TableCell align="right">Precio Total</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Artículo</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
            <TableCell align="right">Suma</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => incrementProduct({ idProductos: row.id })}>
                  <ArrowDropUpIcon />
                </IconButton>
                {row.qty}
                <IconButton onClick={() => decrementProduct({ idProductos: row.id })} disabled={row.qty === 1}>
                  <ArrowDropDownIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">Q{row.unit.toFixed(2)}</TableCell>
              <TableCell align="right">Q{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={2} />
            <TableCell colSpan={2} align="right">
              Total
            </TableCell>
            <TableCell align="right">Q{ccyFormat(totalPrice)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
