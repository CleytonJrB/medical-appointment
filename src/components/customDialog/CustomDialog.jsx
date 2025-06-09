import { Dialog } from "@mui/material";

export default function CustomDialog(props) {
  const {
    open = false,
    handleCloseDialog = () => {},
    children,
    fullWidth = false,
    modalStyle,
    customMaxWidth,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={(e) => {
        e.stopPropagation();

        handleCloseDialog();
      }}
      fullWidth={fullWidth}
      maxWidth={customMaxWidth ? customMaxWidth : fullWidth ? "xl" : "xs"}
      slotProps={{
        paper: {
          style: {
            borderRadius: ".75rem",
            boxShadow: "0px 4px 16px 0px #1E1E1E26",
            width: "100%",
            padding: "1rem",
            ...modalStyle,
          },
        },
      }}
    >
      {children}
    </Dialog>
  );
}
