import * as React from "react";

import {
  CircularProgress,
  Stack,
  StepLabel,
  useMediaQuery,
} from "@mui/material";

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

export default function CustomStepper({
  steps = defaultSteps,
  mutateComplete = () => Promise.resolve(),
  loading = false,
  enable = false,
}) {
  const isMobile = useMediaQuery("(max-width:800px)");

  const [activeStep, setActiveStep] = React.useState(0);

  const hasSteps = steps.length > 0;

  const totalSteps = steps.length;
  const isLastStep = activeStep === totalSteps - 1;

  async function handleNext() {
    const newActiveStep = activeStep + 1;

    if (steps[activeStep].handleNextStep) {
      await steps[activeStep].handleNextStep();
    }

    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  function handleStep(step) {
    setActiveStep(step);
  }

  async function handleComplete() {
    try {
      await mutateComplete();
    } catch (error) {
      throw new Error("Error on handleComplete", { cause: error });
    }
  }

  function renderSteps(item, index) {
    const { label } = item;

    const completedCondition = index < activeStep;

    const condition = index <= activeStep || enable;

    const propsStepLabel = condition
      ? { onClick: () => handleStep(index) }
      : {};

    return (
      <Step
        key={label}
        completed={completedCondition}
        sx={{ cursor: condition ? "pointer" : "default" }}
      >
        <StepLabel {...propsStepLabel}>
          {!isMobile && <Typography>{label}</Typography>}
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

        {hasSteps ? (
          <Stack gap={1}>
            {isMobile && (
              <Typography variant="h5" pt={4} fontWeight={600}>
                {activeStep + 1} - {steps[activeStep].label}
              </Typography>
            )}

            {steps[activeStep].content()}
          </Stack>
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
          loading={loading}
          sx={{ mr: 1 }}
        >
          Voltar
        </Button>

        <Box sx={{ flex: "1 1 auto" }} />

        {isLastStep ? (
          <Button variant="outlined" loading={loading} onClick={handleComplete}>
            Concluir
          </Button>
        ) : (
          <Button onClick={handleNext} sx={{ mr: 1 }} loading={loading}>
            Próximo
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
