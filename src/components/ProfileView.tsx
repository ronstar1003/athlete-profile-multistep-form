import { Grid, Typography, Avatar } from "@mui/material";
import type { SxProps } from "@mui/material";
import type { UserInfo } from "../types";

export default function ProfileView({
  userInfo,
  sx,
}: {
  userInfo: UserInfo;
  sx: SxProps;
}) {
  return (
    <Grid container sx={sx}>
      <Grid
        container
        xs={12}
        sm={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          mt: 1,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/images/boy1.png"
          sx={{ width: 180, height: 180 }}
        />
      </Grid>
      <Grid container spacing={2} xs={12} sm={8} sx={{ alignItems: "start" }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" align="right">
            Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} sx={{ mt: 0.5 }}>
          <Typography>{`${userInfo.firstName} ${userInfo.lastName}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" align="right">
            Gender
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ mt: 0.5 }}>
          <Typography>{`${userInfo.gender ? "Female" : "Male"}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" align="right">
            DOB
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ mt: 0.5 }}>
          <Typography>{userInfo.dateOfBirth}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" align="right">
            Location
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ mt: 0.5 }}>
          <Typography>{`${userInfo.location}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" align="right">
            Team
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ mt: 0.5 }}>
          <Typography>{`${userInfo.team}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" align="right">
            Sports
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} sx={{ mt: 0.5 }}>
          <Typography>{`${userInfo.sports.join(", ")}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" align="right">
            Description
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} sx={{ mt: 0.5 }}>
          <Typography>{`${userInfo.description}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
