import type { SxProps } from "@mui/material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import type { ProfileRow } from "../types";
import { ClientLink } from "../utils/client-router";

export default function ProfileList({
  rows,
  sx,
}: {
  rows: ProfileRow[];
  sx: SxProps;
}) {
  return (
    <TableContainer component={Paper} elevation={3} sx={sx}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Date of Birth</TableCell>
            <TableCell align="right">Sports</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{`${row.firstName} ${row.lastName}`}</TableCell>
              <TableCell align="right">{row.gender ? "F" : "M"}</TableCell>
              <TableCell align="right">{row.dateOfBirth}</TableCell>
              <TableCell align="right">{row.sports.join(", ")}</TableCell>
              <TableCell align="right">
                <Button
                  component={ClientLink}
                  to={`/view/${row._id}`}
                  variant="text"
                  sx={{ textTransform: "none", p: 0 }}
                  size="small"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
