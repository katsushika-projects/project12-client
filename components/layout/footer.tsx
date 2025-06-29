import { Copyright } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full py-2 flex px-4 md:px-6 bg-neutral-100 mt-6 justify-between flex-wrap-reverse">
      <small className="flex gap-0.5 items-center text-xs font-thin text-muted-foreground">
        <Copyright size={14} />
        2025 everstudy
      </small>
      <div className="flex gap-1 text-xs text-neutral-800">
        <Link href="/legal/terms" className="p-1 hover:opacity-70">
          利用規約
        </Link>
        <Link href="/legal/privacy" className="p-1 hover:opacity-70">
          プライバシーポリシー
        </Link>
      </div>
    </div>
  );
}
