import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  function handleSubmit(e) {
    
    e.preventDefault();
    console.log(values);
  }

  function handleInputChange(e) {

    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 2 }} elevation={3}>
        <Avatar sx={{ mx: "auto", mb: 2, color: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb:2 }}>
          <TextField value={values.username} onChange={handleInputChange} name="username" label="Enter username" size="small" sx={{ mb: 2 }} fullWidth required autoFocus />
          <TextField value={values.password} onChange={handleInputChange} name="password" type="password" label="Enter password" size="small" sx={{ mb: 2 }} fullWidth required />
          <Button type="submit" variant="contained" sx={{ mt: 1 }} color="secondary" fullWidth>Submit</Button>
        </Box>
      </Paper>
    </Container>
  )
}