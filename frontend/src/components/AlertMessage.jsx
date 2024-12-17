import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertMessage({openAlert, closeAlert, alertSeverity, alertMessage}) {
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      onClose={closeAlert}
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
