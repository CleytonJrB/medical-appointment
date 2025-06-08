export function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function validateName(name) {
  let value = "";

  const [firstName, lastName] =
    typeof name === "string" ? name.split(" ") : ["", ""];

  if (firstName && !!firstName.length) {
    value = firstName[0];
  }

  if (lastName && !!lastName.length) {
    value += lastName[0];
  }

  return value;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: validateName(name),
  };
}
