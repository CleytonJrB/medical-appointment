import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // tempo atual em segundos
    return decoded.exp < now;
  } catch (e) {
    console.error("Erro ao decodificar o token:", e);
    return true; // token inválido ou corrompido
  }
}
