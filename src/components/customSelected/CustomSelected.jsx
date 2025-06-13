import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FormHelperText } from "@mui/material";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function CustomSelected({
  value = null,
  label = "label",
  list = [],
  onChange,
  error = null,
  multiple = false,
}) {
  const theme = useTheme();
  const [selected, setSelected] = React.useState(value ?? []);
  const [selectedValue, setSelectedValue] = React.useState(value ?? "");

  const handleMultipleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    onChange(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  if (multiple) {
    return (
      <FormControl
        sx={{
          minWidth: 180,
          mt: ".5rem",
        }}
      >
        <InputLabel id="demo-multiple-chip-label" error={Boolean(error)}>
          {label}
        </InputLabel>

        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selected}
          onChange={handleMultipleChange}
          error={Boolean(error)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: 0.5, overflowX: "auto" }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {list.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selected, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>

        {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth sx={{ mt: ".5rem" }}>
      <InputLabel id="demo-simple-select-label" error={Boolean(error)}>
        {label}
      </InputLabel>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label={label}
        error={Boolean(error)}
        onChange={handleChange}
      >
        {list.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>

      {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}
