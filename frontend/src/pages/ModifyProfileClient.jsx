import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormModifyUser from './../components/FormModifyUser';

export default function ModifyProfileClient() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 15 }}>
        <Typography variant="h6" component="h6" gutterBottom align="center">
            Modificar perfil
        </Typography>
        <Box>
            <FormModifyUser />
        </Box>
    </Box>
  )
}
