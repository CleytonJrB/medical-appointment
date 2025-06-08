import { createTheme } from "@mui/material/styles";

import { customColors } from "../styles/colors";

import "@fontsource/roboto/200.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const theme = createTheme({
  palette: {
    primary: {
      main: customColors.black,
      light: customColors.black50,
      dark: customColors.black80,
    },
    red: {
      main: customColors.red,
      light: customColors.red,
      dark: customColors.red,
    },
    white: {
      main: customColors.white,
      light: customColors.white50,
      dark: customColors.white,
    },
    gray: {
      main: customColors.gray,
      light: customColors.gray05,
      dark: customColors.gray80,
    },
    black: {
      main: customColors.black,
      light: customColors.black,
      dark: customColors.black,
    },
    green: {
      main: customColors.green,
      light: customColors.green,
      dark: customColors.green,
    },
  },
  typography: {
    fontFamily: "roboto, sans-serif",
    h1: {
      color: customColors.black,
      fontSize: "5rem",
      fontWeight: 700,
    },
    h2: {
      color: customColors.black,
      fontSize: "3.75rem",
      fontWeight: 500,
    },
    h3: {
      color: customColors.black,
      fontSize: "3rem",
      fontWeight: 500,
    },
    h4: {
      color: customColors.black,
      fontSize: "2.125rem",
      fontWeight: 500,
    },
    h5: {
      color: customColors.black,
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    body1: {
      color: customColors.black,
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      color: customColors.black,
      fontSize: ".875rem",
      fontWeight: 400,
    },
  },
});

export default theme;
