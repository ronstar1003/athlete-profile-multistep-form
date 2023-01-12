import { api } from "../utils/api";
import { Button, Stack, Typography, Container } from "@mui/material";
import ProfileList from "../components/ProfileList";
import { ClientLink } from "../utils/client-router";
import type { ProfileRow } from "../types";
import moment from "moment";

export default function DashboardScreen() {
  const rows: ProfileRow[] = [
    {
      _id: "1",
      firstName: "Elton",
      lastName: "Alcantara",
      gender: 0,
      dateOfBirth: moment("1984-03-02"),
      sports: ["Football", "Baseball"],
    },
    {
      _id: "2",
      firstName: "Roy",
      lastName: "Zhang",
      gender: 1,
      dateOfBirth: moment("1999-02-22"),
      sports: ["Soccer", "Archery", "Wrestling"],
    },
  ];

  const hello = api.example.hello.useQuery({ text: "from tRPC" });

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
      <ProfileList rows={rows} sx={{ marginTop: 2 }} />
    </Container>
  );
}
