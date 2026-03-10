import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../auth.api";
import { useAuthStore } from "../../store/auth.store";

export const useAuth = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  const login = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      const { user, token } = res.data;
      setAuth(user, token);
      localStorage.setItem("token", token);
    },
  });

  const register = useMutation({
    mutationFn: registerApi,
    onSuccess: (res) => {
      const { user, token } = res.data;
      setAuth(user, token);
      localStorage.setItem("token", token);
    },
  });

  return { login, register };
};
