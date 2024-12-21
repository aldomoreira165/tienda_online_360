import PropTypes from 'prop-types'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertMessage({openAlert, closeAlert, alertSeverity, alertMessage}) {
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={closeAlert}
        severity={alertSeverity}
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}

AlertMessage.propTypes = {
  openAlert: PropTypes.bool.isRequired,
  closeAlert: PropTypes.func.isRequired,
  alertSeverity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
  alertMessage: PropTypes.string.isRequired,
};