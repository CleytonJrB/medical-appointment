import React, { useState } from "react";

import MUIPopover from "@mui/material/Popover";

export default function PopoverTemplate({
  anchor,
  children,
  sx_children,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  stopPropagation,
}) {
  const [anchorElement, setAnchorElement] = useState(null);

  // prettier-ignore
  const handleOpenPopover = (event) => setAnchorElement(event.currentTarget)
  const handleClosePopover = () => setAnchorElement(null);

  const anchorElementProps = stopPropagation
    ? {
        onClick: (event) => event.stopPropagation(),
      }
    : {};

  const open = Boolean(anchorElement);
  const id = open ? `simple-popover-${anchor?.valueOf()}` : undefined;

  return (
    <div>
      {anchor({ handleOpenPopover, open })}

      <MUIPopover
        {...anchorElementProps}
        id={id}
        open={open}
        anchorEl={anchorElement}
        onClose={handleClosePopover}
        anchorOrigin={anchorOrigin}
        sx={sx_children}
      >
        {children instanceof Function
          ? children({ handleClosePopover })
          : children}
      </MUIPopover>
    </div>
  );
}
