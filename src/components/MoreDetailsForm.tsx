import * as React from "react";
import { Grid, Typography, TextField } from "@mui/material";
import type { UserInfo, Field, Error } from "../types";

export default function MoreDetailsForm({
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
        More Details
      </Typography>
      <Grid container spacing={3} sx={{ mt: -1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Team"
            fullWidth
            variant="outlined"
            error={error.team}
            value={userInfo.team}
            onChange={(e) => handleChange("team", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Location"
            fullWidth
            variant="outlined"
            error={error.location}
            value={userInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            label="Description"
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
            error={error.description}
            value={userInfo.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
}
