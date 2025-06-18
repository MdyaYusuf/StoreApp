import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFoundPage() {

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Not Found Error</Typography>
      <Alert security="error">Aradığınız kaynak bulunamadı.</Alert>
      <Button component={Link} to="/" variant="contained" color="secondary" sx={{ mt: 2 }}>Ana Sayfa</Button>
    </Paper>
  )
}