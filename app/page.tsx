import Google from "@/components/icons/google";

const clientId = process.env.NEXT_PUBLIC_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY || "";
const scope = process.env.NEXT_PUBLIC_SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE || "";
const redirectUri = `${process.env.NEXT_PUBLIC_CLIENT_URL}/callback`; // 認証後のリダイレクト先 フロント側のURL
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scope)}`;

export default function Home() {
  return (
    <div className="max-w-screen-sm m-auto min-h-svh flex flex-col gap-8 md:gap-16 justify-center items-center">
      <h1 className="font-bold tracking-tight text-5xl md:text-6xl">
        everstudy
      </h1>

      <a
        href={authUrl}
        className="flex items-center gap-2 border rounded h-10 px-4 hover:bg-black/5"
      >
        <Google className="block size-5" />
        <span className="text-sm text-center">Googleでログイン</span>
      </a>
    </div>
  );
}
