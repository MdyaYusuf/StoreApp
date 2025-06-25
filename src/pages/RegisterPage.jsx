import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function RegisterPage() {

  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 2 }} elevation={3}>
        <Avatar sx={{ mx: "auto", mb: 2, color: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          Register
        </Typography>
        <Box component="form" sx={{ mb:2 }}>
          <TextField name="username" label="Enter username" size="small" sx={{ mb: 2 }} fullWidth required autoFocus />
          <TextField name="email" label="Enter email" size="small" sx={{ mb: 2 }} fullWidth required />
          <TextField name="password" type="password" label="Enter password" size="small" sx={{ mb: 2 }} fullWidth required />
          <Button type="submit" variant="contained" sx={{ mt: 1 }} color="secondary" fullWidth>Submit</Button>
        </Box>
      </Paper>
    </Container>
  )
}