import { api } from "../utils/api";
import { Button, Stack, Typography, Container, Paper } from "@mui/material";
import { ClientLink } from "../utils/client-router";
import type { UserInfo } from "../types";
import Loading from "../components/Loading";
import ProfileView from "../components/ProfileView";

export default function ProfileViewScreen({ param: id }: { param: string }) {
  const {
    data: userInfo,
    isLoading,
  }: { data: UserInfo | undefined; isLoading: boolean } =
    api.profile.get.useQuery({
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
          <ProfileView userInfo={userInfo as UserInfo} sx={{ mt: 5 }} />
        )}
      </Paper>
    </Container>
  );
}
