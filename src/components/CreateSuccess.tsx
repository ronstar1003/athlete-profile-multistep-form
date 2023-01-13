import { Typography } from "@mui/material";
import { ClientLink } from "../utils/client-router";

export default function CreateSuccess({
  viewLink,
  homeLink,
}: {
  viewLink: string;
  homeLink: string;
}) {
  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Successfully created.
      </Typography>
      <Typography variant="subtitle1" align="center">
        You can{" "}
        <ClientLink to={viewLink}>
          <Typography color="blue" component="span">
            view
          </Typography>
        </ClientLink>{" "}
        your profile or{" "}
        <ClientLink to={homeLink}>
          <Typography color="blue" component="span">
            go
          </Typography>{" "}
          to home
        </ClientLink>
        .
      </Typography>
    </>
  );
}
