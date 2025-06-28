import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {

  const { register, formState: { errors } } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("firstname", {
            required: "Firstname alanı boş bırakılamaz.",
            minLength: {
              value: 2, message: "Firstname minimum 2 karakter olmalıdır."
            }
          })}
          label="Enter firstname"
          size="small"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          error={!!errors.firstname}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("lastname", {
            required: "Lastname alanı boş bırakılamaz.",
            minLength: {
              value: 2, message: "Lastname minimum 2 karakter olmalıdır."
            }
          })}
          label="Enter lastname"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.lastname}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("phone", {
            required: "Phone alanı boş bırakılamaz."
          })}
          label="Enter phone"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.phone}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("city", {
            required: "City alanı boş bırakılamaz."
          })}
          label="Enter city"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.city}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          {...register("adress", {
            required: "Adres alanı boş bırakılamaz."
          })}
          label="Enter address"
          size="small"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          error={!!errors.address}
        />
      </Grid>
    </Grid>
  )
}