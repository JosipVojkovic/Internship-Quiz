import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context";

interface User {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const { setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: User) => {
      const API_URL =
        import.meta.env.VITE_API_URL ||
        "https://internship-quiz-production.up.railway.app";
      //const res = await fetch("http://localhost:3000/api/auth/register", {
      const res = await fetch(`${API_URL}/api/auth/register`, {
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
