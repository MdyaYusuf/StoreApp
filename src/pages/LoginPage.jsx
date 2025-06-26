import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function LoginPage() {

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const navigate = useNavigate();

  function handleForm(data) {
    requests.account.login(data)
      .then((result) => {
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
      })
      .catch((error) => console.log(error));
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
        <Box component="form" sx={{ mb: 2 }} noValidate onSubmit={handleSubmit(handleForm)}>
          <TextField
            {...register("username", {
              required: "Username alanı boş bırakılamaz.",
              minLength: {
                value: 3, message: "Username minimum 3 karakter olmalıdır."
              }
            })}
            label="Enter username"
            size="small"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("password", {
              required: "Password alanı boş bırakılamaz.",
              minLength: {
                value: 6, message: "Password minimum 6 karakter olmalıdır."
              }
            })}
            type="password"
            label="Enter password"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={!isValid}
            sx={{ mt: 1 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}