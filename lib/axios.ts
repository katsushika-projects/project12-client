import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const apiUrl = process.env.API_URL || "http://localhost:8000";
const djangoClientId = process.env.NEXT_PUBLIC_DJANGO_CLIENT_ID_OF_GOOGLE;
const djangoClientSecret =
  process.env.NEXT_PUBLIC_DJANGO_CLIENT_SECRET_OF_GOOGLE;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const formDataApi = axios.create({
  baseURL: apiUrl,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 再試行済みフラグ

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("リフレッシュトークンが存在しません");
        }
        // リフレッシュエンドポイントにリクエスト
        const { data } = await axios.post(
          "http://localhost:8000/auth/token",
          {
            grant_type: "refresh_token",
            client_id: djangoClientId,
            client_secret: djangoClientSecret,
            refresh_token: refreshToken,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        // 新しいアクセストークンを localStorage に保存
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        // 元のリクエストのヘッダーを更新して再リクエスト
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // リフレッシュにも失敗した場合、ログアウト処理やログイン画面へのリダイレクトを行う
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
