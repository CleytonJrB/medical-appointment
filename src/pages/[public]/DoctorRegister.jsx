import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../providers/AuthProvider";

import * as Yup from "yup";

import { extractYupErrors, routes } from "../../utils/general";

import { AuthLabel, AuthMainContainer } from "../../styles/common";

import { Button, Stack, Typography } from "@mui/material";

import CustomTextField from "../../components/customTextField/CustomTextField";
import HomeHeader from "../../components/homeHeader/HomeHeader";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { medicalSpecialtiesList } from "../../constantes";
import CustomSelected from "../../components/customSelected/CustomSelected";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatorio!"),
  description: Yup.string().required("Campo obrigatorio!"),
  specialties: Yup.array()
    .min(1, "Lista vazia!")
    .required("Campo obrigatorio!"),
  email: Yup.string()
    .email("Formato de E-mail invalido!")
    .required("Campo obrigatorio!"),
  password: Yup.string()
    .min(8, "No minimo de 8 caracteres")
    .required("Campo obrigatorio!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "A senha não se conicidem")
    .required("Campo obrigatorio!"),
});

const initialValues = {
  name: "",
  email: "",
  description: "",
  specialties: [],
  password: "",
  confirmPassword: "",
};

export default function DoctorRegister() {
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const registerMutate = useMutation({
    mutationFn: async (values) => {
      await customHandle(values);

      const registerData = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password.trim(),
        description: values.description.trim(),
        specialties: values.specialties,
        type: "DOCTOR",
      };

      await register(registerData);
    },
    onSuccess: () => {
      navigate(routes.protected.dashboard);
    },
    onError: (error) => {
      console.error("Error during registration:", error);
    },
  });

  async function customHandle(values) {
    try {
      await registerSchema.validate(values, {
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
    <AuthMainContainer sx={{ paddingBottom: "5rem" }}>
      <HomeHeader simple />

      <AuthLabel>
        <Typography variant="h3">Ola Dr.</Typography>
        <Typography variant="h5">
          Vamos criar uma nova conta pra você, passe essas informações
        </Typography>

        <Stack gap={"1.2rem"}>
          <CustomTextField
            name="name"
            type="text"
            label="Nome*"
            placeholder={"Seu nome"}
            error={formErrors.name}
            value={form.name}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, name: e };
              });
              setFormErrors((prev) => ({
                ...prev,
                name: "",
              }));
            }}
          />

          <CustomTextField
            name="email"
            type="email"
            label="E-mail*"
            placeholder={"Example@email.com"}
            error={formErrors.email}
            value={form.email}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, email: e };
              });
              setFormErrors((prev) => ({
                ...prev,
                email: "",
              }));
            }}
          />

          <CustomTextField
            label={"Explique um pouco sobre você*"}
            value={form.description}
            placeholder={
              "Descreva brevemente sua formação, experiência e especializações."
            }
            fullWidth
            multiline={10}
            error={formErrors.description}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, description: e };
              });
              setFormErrors((prev) => ({
                ...prev,
                description: "",
              }));
            }}
          />

          <CustomSelected
            label="Especiaplidades"
            list={medicalSpecialtiesList}
            multiple
            value={form.specialties}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, specialties: e };
              });
              setFormErrors((prev) => ({
                ...prev,
                specialties: "",
              }));
            }}
          />

          <CustomTextField
            name="password"
            label="Senha*"
            placeholder={"Insira a sua senha"}
            type={showPassword ? "text" : "password"}
            error={formErrors.password}
            value={form.password}
            rightIcon={
              showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
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

          <CustomTextField
            name="confirmPassword"
            label="Confirmar senha*"
            placeholder={"Insira a sua senha novamente"}
            type={showConfirmPassword ? "text" : "password"}
            error={formErrors.confirmPassword}
            value={form.confirmPassword}
            rightIcon={
              showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
            onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, confirmPassword: e };
              });

              setFormErrors((prev) => ({
                ...prev,
                confirmPassword: "",
              }));
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={registerMutate.isLoading}
            loading={registerMutate.isLoading}
            onClick={async () => {
              await registerMutate.mutateAsync(form);
            }}
          >
            Criar conta
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleRedirect(routes.public.login)}
          >
            Já tenho conta
          </Button>
        </Stack>
      </AuthLabel>
    </AuthMainContainer>
  );
}
