import { AppBar, Toolbar, Typography } from "@mui/material";
import { ClientLink } from "../utils/client-router";

export default function Header() {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <ClientLink to="/">
          <Typography
            variant="h6"
            color="inherit"
            textTransform="uppercase"
            noWrap
          >
            Athelete Profile Collector
          </Typography>
        </ClientLink>
      </Toolbar>
    </AppBar>
  );
}
