import type { SxProps } from "@mui/material";
import { Typography, Link } from "@mui/material";

export default function Copyright({ sx }: { sx: SxProps }) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        Athelete Profile Collector
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
