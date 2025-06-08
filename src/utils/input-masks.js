export function priceInputMask(event) {
  const inputValue = event.target.value;

  let value = inputValue.replace(/\D/g, "");

  if (value.length > 2) {
    value = value.slice(0, -2) + "," + value.slice(-2);
  } else if (value.length === 4) {
    value = "0," + value;
  } else if (value.length === 1) {
    value = "0,0" + value;
  }

  if (value.startsWith("0")) {
    value = value.slice(3);
  }

  event.target.value = value;

  return event;
}

export function phoneInputMask(event) {
  const inputValue = event.target.value;

  if (!inputValue) {
    return event;
  }

  let value = inputValue.replace(/\D/g, ""); // Remove non-numeric characters

  if (!value) {
    event.target.value = inputValue;

    return event;
  }

  if (value.length > 11) {
    value = value.slice(0, 11); // Limit to 11 digits
  }

  if (value.length > 6) {
    value = value.slice(0, 2) + " " + value.slice(2, 7) + "-" + value.slice(7);
  } else if (value.length > 2) {
    value = value.slice(0, 2) + " " + value.slice(2);
  }

  event.target.value = value;

  return event;
}

export function numberInputMask(event) {
  const inputValue = event.target.value;

  if (!inputValue) {
    return event;
  }

  const value = inputValue.replace(/\D/g, ""); // Remove non-numeric characters

  event.target.value = value;

  return event;
}

export function cpfCnpjInputMask(event) {
  const inputValue = event.target.value;

  if (!inputValue) {
    return event;
  }

  let value = event.target.value.replace(/\D/g, ""); // Remove tudo que não for número

  // Limita a 14 dígitos (CNPJ)
  if (value.length > 14) {
    value = value.slice(0, 14);
  }

  // Aplica a máscara de CPF: 000.000.000-00
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // Aplica a máscara de CNPJ: 00.000.000/0000-00
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }

  event.target.value = value;
  return event;
}
