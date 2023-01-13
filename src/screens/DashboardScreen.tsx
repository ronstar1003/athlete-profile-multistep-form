import { api } from "../utils/api";
import { Button, Stack, Typography, Container } from "@mui/material";
import ProfileList from "../components/ProfileList";
import { ClientLink } from "../utils/client-router";
import type { ProfileRow } from "../types";
import Loading from "../components/Loading";

export default function DashboardScreen() {
  const {
    data: rows,
    isLoading,
  }: { data: ProfileRow[] | undefined; isLoading: boolean } =
    api.profile.get.useQuery({ id: "" });

  return (
    <Container component="main" maxWidth="md" sx={{ padding: 2 }}>
      <Stack direction="row" alignItems="end">
        <Typography component="h1" variant="h4">
          Profile List
        </Typography>
        <Button
          component={ClientLink}
          to="/form"
          variant="contained"
          sx={{ marginLeft: "auto", textTransform: "none" }}
        >
          Add Profile
        </Button>
      </Stack>
      {isLoading ? (
        <Loading />
      ) : (
        <ProfileList rows={rows || []} sx={{ marginTop: 2 }} />
      )}
    </Container>
  );
}
