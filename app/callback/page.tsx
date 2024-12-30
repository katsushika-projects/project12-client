"use client";
import { api } from "@/lib/axios";
import { useUserContext } from "@/contexts/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const djangoClientId = process.env.NEXT_PUBLIC_DJANGO_CLIENT_ID_OF_GOOGLE;

const CallbackPage = () => {
  const router = useRouter();
  const { setUser } = useUserContext();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (!token) return;

    const fetchLogin = async () => {
      try {
        const res = await api.post("/auth/convert-token/", {
          grant_type: "convert_token",
          client_id: djangoClientId,
          backend: "google-oauth2",
          token: token,
        });
        const data = res.data;
        console.log(data);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        setUser(data.user);
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogin();
  }, []);
  return <div>ログイン中...</div>;
};

export default CallbackPage;
