import { Button, IconButton, Stack, Typography } from "@mui/material";

import PopoverTemplate from "../popoverTemplate/PopoverTemplate";

import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function CustomThreeDots(props) {
  const isLoading = props?.isLoading ?? false;
  const disabled = props?.disabled ?? false;

  const hasMenus = !!props?.menus && !!props?.menus?.length;
  const menus = hasMenus ? props?.menus : [];

  function renderMenus(item, index) {
    const title = item.title;
    const handle = item.handle;
    const disabled = item.disabled ?? false;
    const icon = item.icon();

    return (
      <Button
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();

          handle();
        }}
        variant={"text"}
        startIcon={icon}
        loading={isLoading}
        disabled={disabled || isLoading}
        sx={{ backgroundColor: disabled ? "darkgrey" : null }}
      >
        <Typography color={item.color} textTransform={"none"}>
          {title}
        </Typography>
      </Button>
    );
  }

  return (
    <PopoverTemplate
      stopPropagation
      anchor={({ handleOpenPopover }) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            handleOpenPopover(e);
          }}
          disabled={!hasMenus || disabled}
          sx={{
            ...props?.styled,
          }}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      sx_children={{ mt: 1 }}
    >
      <Stack p={1} borderRadius={1} gap={0.5}>
        {menus?.map((item, index) => renderMenus(item, index))}
      </Stack>
    </PopoverTemplate>
  );
}
