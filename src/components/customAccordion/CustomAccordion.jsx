import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Divider } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { customColors } from "../../styles/colors";

export default function CustomAccordion(props) {
  const { index, detailsChildren, summaryChildren } = props;

  return (
    <Accordion
      sx={{
        width: "100%",

        border: "1px solid #E0E0E0",

        boxShadow: "none",

        "&.MuiAccordion-root": {
          borderRadius: "1rem",
        },

        "&.Mui-expanded": {
          margin: "0.5rem 0",
          borderRadius: "1rem",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: customColors.black }} />}
        aria-controls={"panel" + index + "-content"}
        id={"panel" + index + "-header"}
      >
        {summaryChildren}
      </AccordionSummary>

      <Divider />

      <AccordionDetails sx={{ margin: ".5rem 0rem .2rem 0rem" }}>
        {detailsChildren}
      </AccordionDetails>
    </Accordion>
  );
}
