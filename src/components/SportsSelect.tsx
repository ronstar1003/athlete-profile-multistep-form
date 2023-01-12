import * as React from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Checkbox,
  ListItemText,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SPORTS = [
  "Golf",
  "Tennis",
  "Cricket",
  "Basketball",
  "Baseball",
  "American Football",
  "Aquatics",
  "Archery",
  "Automobile Racing",
  "Badminton",
  "Beach Volleyball",
  "Bobsleigh",
  "Body Building",
  "Boxing",
  "Cross Country Running",
  "Cross Country Skiing",
  "Curling",
  "Cycling",
  "Darts",
  "Decathlon",
  "Down Hill Skiing",
  "Equestrianism",
  "eSports",
  "Fencing",
  "Field Hockey",
  "Figure Skating",
  "Gymnastics",
  "Ice Hockey",
  "Martial Arts",
  "Mixed Martial Arts",
  "Modern Pentathlon",
  "Motorcycle Racing",
  "Netball",
  "Polo",
  "Racquetball",
  "Rowing",
  "Rugby",
  "Sailing",
  "Softball",
  "Shooting",
  "Skateboarding",
  "Skeet Shooting",
  "Skeleton",
  "Snow Boarding",
  "Soccer (Football)",
  "Squash",
  "Surfing",
  "Swimming",
  "Track and Field",
];

export default function SportsSelect({
  value,
  setValue,
  error,
}: {
  value: string[];
  setValue: (value: string[]) => void;
  error: boolean;
}) {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ width: "100%" }} error={error}>
      <InputLabel id="sports-label">Sports *</InputLabel>
      <Select
        labelId="sports-label"
        id="sports-input"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput id="select-sports" label="Sport" error={error} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {SPORTS.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={value.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
