import * as React from "react";
import {
  FormControl,
  RadioGroup,
  Radio,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import SportsSelect from "./SportsSelect";
import type { UserInfo, Field, Error } from "../types";
import moment from "moment";

export default function BasicInfoForm({
  userInfo,
  handleChange,
  error,
}: {
  userInfo: UserInfo;
  handleChange: (field: Field, value: unknown) => void;
  error: Error;
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Basic Info
      </Typography>
      <Grid container spacing={3} sx={{ mt: -1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="First name"
            fullWidth
            variant="outlined"
            error={error.firstName}
            value={userInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Last name"
            fullWidth
            variant="outlined"
            error={error.lastName}
            value={userInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date of Birth"
              value={moment(userInfo.dateOfBirth)}
              onChange={(value) =>
                handleChange("dateOfBirth", value?.format("YYYY-MM-DD"))
              }
              inputFormat="YYYY-MM-DD"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  error={error.dateOfBirth}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <FormControl required sx={{ ml: 2 }} error={error.gender}>
            <FormLabel id="gender-label" sx={{ mt: "-10px" }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-label"
              value={userInfo.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <FormControlLabel value="1" control={<Radio />} label="Female" />
              <FormControlLabel value="0" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <SportsSelect
            error={error.sports}
            value={userInfo.sports}
            setValue={(value) => handleChange("sports", value)}
          />
        </Grid>
      </Grid>
    </>
  );
}
