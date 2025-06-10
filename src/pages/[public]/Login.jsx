import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import * as Yup from "yup";

import { Button, Stack, Typography } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Link, useNavigate } from "react-router-dom";
import { extractYupErrors, routes } from "../../utils/general";
import { useAuthContext } from "../../providers/AuthProvider";
import CustomTextField from "../../components/customTextField/CustomTextField";
import { AuthLabel, AuthMainContainer } from "../../styles/common";
import HomeHeader from "../../components/homeHeader/HomeHeader";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato de E-mail invalido!")
    .required("Campo obrigatorio!"),
  password: Yup.string().required("Campo obrigatorio!"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const loginMutate = useMutation({
    mutationFn: async ({ values }) => {
      const email = values.email.trim().toLowerCase();
      const password = values.password.trim();

      await customHandle(values);

      await login(email, password);
    },
    onSuccess: () => {
      navigate(routes.protected.dashboard);
    },
    onError: (error) => {
      console.error("Error during login:", error);
    },
  });

  async function customHandle(values) {
    try {
      await loginSchema.validate(values, {
        abortEarly: false,
      });

      setFormErrors({});
    } catch (error) {
      setFormErrors(extractYupErrors(error));
      throw error;
    }
  }

  function handleRedirect(route) {
    navigate(route);
  }

  return (
    <AuthMainContainer>
      <HomeHeader simple />

      <AuthLabel>
        <Typography variant="h4">Entrar na conta</Typography>

        <Stack gap={"1.2rem"}>
          <CustomTextField
            name="email"
            type="email"
            label="E-mail*"
            placeholder={"Example@email.com"}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, email: e };
              });

              setFormErrors((prev) => ({
                ...prev,
                email: "",
              }));
            }}
            error={formErrors.email}
            value={form.email}
          />

          <CustomTextField
            name="password"
            type={showPassword ? "text" : "password"}
            label="Senha*"
            placeholder={"Insira a sua senha"}
            rightIcon={
              showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
            error={formErrors.password}
            value={form.password}
            onClick={() => setShowPassword(!showPassword)}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, password: e };
              });

              setFormErrors((prev) => ({
                ...prev,
                password: "",
              }));
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loginMutate.isPending}
            loading={loginMutate.isPending}
            onClick={async () => {
              await loginMutate.mutateAsync({ values: form });
            }}
          >
            Entrar
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleRedirect(routes.public.register)}
          >
            Não tenho conta ainda
          </Button>
        </Stack>
      </AuthLabel>
    </AuthMainContainer>
  );
}
