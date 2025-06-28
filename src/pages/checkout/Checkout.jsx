import { Box, Button, Grid, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Info from "./Info";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import AddressForm from "./AddressForm";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";

const steps = ["Teslimat Bilgileri", "Ödeme", "Sipariş Özeti"];

function getStepContent(step) {

  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
  }
}

export default function CheckoutPage() {

  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm();

  function handlePrevious() {

    setActiveStep(activeStep - 1);
  };

  function handleNext() {

    if (activeStep === 2) {
      // sipariş kayıt
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <Paper>
        <Grid container spacing={3}>
          <Grid size={4} sx={{ p: 3, borderRight: "1px solid", borderColor: "divider" }}>
            <Info />
          </Grid>
          <Grid size={8} sx={{ p: 3 }}>
            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
              {
                steps.map((label) => (
                  <Step key={label} sx={{ color: "secondary" }}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))
              }
            </Stepper>
            {activeStep === steps.length ? (
              <Typography>Siparişiniz tamamlandı.</Typography>
            ) : (
              <>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}
                  <Box sx={[
                    { display: "flex" },
                    activeStep !== 0 ? { justifyContent: "space-between" } : { justifyContent: "flex-end" }
                  ]}>
                    {activeStep !== 0 && (
                      <Button onClick={handlePrevious} startIcon={<ChevronLeftRounded />} variant="contained" color="secondary">
                        Geri
                      </Button>
                    )}
                    <Button type="submit" startIcon={<ChevronRightRounded />} variant="contained" color="secondary">
                      {activeStep === 2 ? "Tamamla" : "İleri"}
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  )
}