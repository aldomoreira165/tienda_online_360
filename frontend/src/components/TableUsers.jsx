import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// formateando la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function TableUsers({ usuarios }) {
  function createData(
    idUsuario,
    correoUsuario,
    nombreUsuario,
    telefonoUsuario,
    nacimientoUsuario,
    creacionUsuario,
    nombreRol,
    nombreEstado
  ) {
    return {
      idUsuario,
      correoUsuario,
      nombreUsuario,
      telefonoUsuario,
      nacimientoUsuario,
      creacionUsuario,
      nombreRol,
      nombreEstado,
    };
  }

  const rows = usuarios.map((usuario) =>
    createData(
      usuario.idUsuarios,
      usuario.correo_electronico,
      usuario.nombre_completo,
      usuario.telefono,
      usuario.fecha_nacimiento,
      usuario.fecha_creacion,
      usuario.nombre_rol,
      usuario.nombre_estado
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Nacimiento</TableCell>
            <TableCell>Creación</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.idUsuario}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idUsuario}
              </TableCell>
              <TableCell>{row.correoUsuario}</TableCell>
              <TableCell>{row.nombreUsuario}</TableCell>
              <TableCell>{row.telefonoUsuario}</TableCell>
              <TableCell>{formatDate(row.nacimientoUsuario)}</TableCell>
              <TableCell>{formatDate(row.creacionUsuario)}</TableCell>
              <TableCell>{row.nombreRol}</TableCell>
              <TableCell>{row.nombreEstado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableUsers.propTypes = {
  usuarios: PropTypes.arrayOf(
    PropTypes.shape({
      idUsuarios: PropTypes.number.isRequired,
      correo_electronico: PropTypes.string.isRequired,
      nombre_completo: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      fecha_nacimiento: PropTypes.string.isRequired,
      fecha_creacion: PropTypes.string.isRequired,
      nombre_rol: PropTypes.string.isRequired,
      nombre_estado: PropTypes.string.isRequired,
    })
  ).isRequired,
};
