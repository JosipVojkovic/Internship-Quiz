import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router";

type LoginData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      //const res = await fetch("http://localhost:3000/api/auth/login", {
      const res = await fetch(`${process.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error occurred");
      }

      return res.json();
    },
    onSuccess: ({ access_token }) => {
      setAccessToken(access_token);
      localStorage.setItem("access_token", access_token);
      navigate("/");
    },
  });
};
