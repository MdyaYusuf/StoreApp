import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {

  const { register, formState: { errors } } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardname", {
            required: "Cardname alanı boş bırakılamaz."
          })}
          label="Enter cardname"
          size="small"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          error={!!errors.cardname}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardnumber", {
            required: "Cardnumber alanı boş bırakılamaz."
          })}
          label="Enter cardnumber"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.cardnumber}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("expirydate", {
            required: "Expirydate alanı boş bırakılamaz."
          })}
          label="Enter expirydate"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.expirydate}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cvv", {
            required: "Cvv alanı boş bırakılamaz."
          })}
          label="Enter cvv"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.cvv}
        />
      </Grid>
    </Grid>
  )
}