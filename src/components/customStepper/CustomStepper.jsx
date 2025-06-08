import * as React from "react";

import { CircularProgress, Stack, StepLabel } from "@mui/material";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const defaultSteps = [
  {
    label: "Default",
    content: () => (
      <Stack>
        <Typography>Default</Typography>
      </Stack>
    ),
  },
];

export default function CustomStepper({ steps = defaultSteps }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const hasSteps = steps.length > 0;

  const totalSteps = steps.length;
  const isLastStep = activeStep === totalSteps - 1;

  const handleNext = () => {
    const newActiveStep = activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    //handle send data to backend
    alert("handle send data to backend");
  };

  function renderSteps(item, index) {
    const { label } = item;

    const completedCondition = index < activeStep;

    const condition = index <= activeStep;

    const propsStepLabel = condition ? { onClick: handleStep(index) } : {};

    return (
      <Step
        key={label}
        completed={completedCondition}
        sx={{ cursor: condition ? "pointer" : "default" }}
      >
        <StepLabel {...propsStepLabel}>
          <Typography>{label}</Typography>
        </StepLabel>
      </Step>
    );
  }

  return (
    <Stack
      sx={{ width: "100%", minHeight: "65vh", justifyContent: "space-between" }}
    >
      <Stack>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(renderSteps)}
        </Stepper>

        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
          {hasSteps ? (
            steps[activeStep].content()
          ) : (
            <Stack
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                minHeight: "65vh",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Stack>
          )}
        </Typography>
      </Stack>

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="text"
          sx={{ mr: 1 }}
        >
          Voltar
        </Button>

        <Box sx={{ flex: "1 1 auto" }} />

        {isLastStep ? (
          <Button variant="outlined" onClick={handleComplete}>
            Concluir
          </Button>
        ) : (
          <Button onClick={handleNext} sx={{ mr: 1 }}>
            Próximo
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
