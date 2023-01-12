import * as React from "react";

import {
  Container,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import BasicInfoForm from "../components/BasicInfoForm";
import MoreDetailsForm from "../components/MoreDetailsForm";
import ProfileView from "../components/ProfileView";

import { api } from "../utils/api";
import { ClientLink } from "../utils/client-router";
import { Error } from "../types";
import type { UserInfo, Field } from "../types";
import Loading from "../components/Loading";

const steps = ["Basic Info", "More details", "Review"];

const checkStepValidity = (
  userInfo: UserInfo,
  step: number,
  error: Error,
  setError: (error: Error) => void
) => {
  const newError: Error = {} as Error;
  if (step === 0) {
    newError.firstName = !userInfo.firstName;
    newError.lastName = !userInfo.lastName;
    newError.dateOfBirth = !userInfo.dateOfBirth;
    newError.gender = userInfo.gender === null;
    newError.sports = userInfo.sports.length === 0;
  }
  if (step === 1) {
    newError.description = !userInfo.description;
    newError.location = !userInfo.location;
    newError.team = !userInfo.team;
  }
  setError({ ...error, ...newError });
  for (const key of Object.keys(newError) as Iterable<Field>) {
    if (newError[key]) return false;
  }
  return true;
};

const initialErrorState = {
  firstName: false,
  lastName: false,
  gender: false,
  dateOfBirth: false,
  sports: false,
  team: false,
  location: false,
  description: false,
};

export default function FormScreen() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    _id: "",
    firstName: "",
    lastName: "",
    gender: null,
    dateOfBirth: "",
    sports: [],
    team: "",
    location: "",
    description: "",
  });
  const [error, setError] = React.useState<Error>(initialErrorState);
  const [dirty, setDirty] = React.useState<boolean[]>([false, false]);

  const handleFormInputChange = React.useCallback(
    (field: Field, value: unknown, step: number) => {
      const newUserInfo: UserInfo = { ...userInfo, [field]: value };
      setUserInfo(newUserInfo);
      if (dirty[step]) checkStepValidity(newUserInfo, step, error, setError);
    },
    [dirty, error, userInfo]
  );

  const { data, mutate, isLoading, isSuccess } =
    api.profile.create.useMutation();

  const handleFinish = () => {
    mutate(userInfo);
  };

  const handleNext = () => {
    if (activeStep === 0) setDirty([true, dirty[1] as boolean]);
    if (activeStep === 1) setDirty([dirty[0] as boolean, true]);
    if (activeStep === 2) {
      handleFinish();
    }
    if (!checkStepValidity(userInfo, activeStep, error, setError)) return;
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const stepContent = React.useMemo(() => {
    if (isSuccess) return <div>Success</div>;
    switch (activeStep) {
      case 0:
        return (
          <BasicInfoForm
            userInfo={userInfo}
            handleChange={(field: Field, value: unknown) =>
              handleFormInputChange(field, value, 0)
            }
            error={error}
          />
        );
      case 1:
        return (
          <MoreDetailsForm
            userInfo={userInfo}
            handleChange={(field: Field, value: unknown) =>
              handleFormInputChange(field, value, 1)
            }
            error={error}
          />
        );
      case 2:
        return <ProfileView userInfo={userInfo} sx={{ mt: 2 }} />;
      case 3:
        return isSuccess ? <div>Success</div> : <div>Saving ...</div>;
      default:
        throw new Error("Unknown step");
    }
  }, [activeStep, userInfo, error, handleFormInputChange, isLoading]);

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ p: 2 }}>
        <Stack direction="row" alignItems="end">
          <Typography component="h1" variant="h4">
            Create Profile
          </Typography>
          <Button
            component={ClientLink}
            to="/"
            variant="text"
            sx={{ marginLeft: "auto", textTransform: "none" }}
          >
            Go To Home
          </Button>
        </Stack>
        <Paper variant="elevation" elevation={3} sx={{ mt: 2, p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ pt: 2, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            isSuccess ? (
              <>
                <Typography variant="h5" align="center" gutterBottom>
                  Successfully created.
                </Typography>
                <Typography variant="subtitle1" align="center">
                  You can{" "}
                  <ClientLink to={`/view/${data._id}`}>
                    <Typography color="blue" component="span">
                      view
                    </Typography>
                  </ClientLink>{" "}
                  your profile or{" "}
                  <ClientLink to="/">
                    <Typography color="blue" component="span">
                      go
                    </Typography>{" "}
                    to home
                  </ClientLink>
                  .
                </Typography>
              </>
            ) : (
              <Loading />
            )
          ) : (
            <React.Fragment>
              {stepContent}
              {!isSuccess && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              )}
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </>
  );
}
