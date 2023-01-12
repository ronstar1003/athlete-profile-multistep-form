import { api } from "../utils/api";
import { Button, Stack, Typography, Container, Paper } from "@mui/material";
import ProfileList from "../components/ProfileList";
import { ClientLink } from "../utils/client-router";
import type { ProfileRow } from "../types";
import Loading from "../components/Loading";
import ProfileView from "../components/ProfileView";

export default function ProfileViewScreen({ param: id }) {
  const { data: userInfo, isLoading } = api.profile.get.useQuery({
    id,
  });

  return (
    <Container component="main" maxWidth="md" sx={{ padding: 2 }}>
      <Stack direction="row" alignItems="end">
        <Typography component="h1" variant="h4">
          Profile View
        </Typography>
        <Button
          component={ClientLink}
          to="/"
          variant="outlined"
          sx={{ marginLeft: "auto", textTransform: "none" }}
        >
          Go To Home
        </Button>
      </Stack>
      <Paper variant="elevation" elevation={3} sx={{ mt: 2, p: 3 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <ProfileView userInfo={userInfo} sx={{ mt: 5 }} />
        )}
      </Paper>
    </Container>
  );
}
