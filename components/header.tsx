"use client";
import { LogOut, Plus, Settings } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserProvider";

const Header = () => {
  const router = useRouter();
  const { user } = useUserContext();

  const handleLogout = () => {
    const result = confirm("ログアウトしますか？");
    if (!result) return;
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <div className="w-full px-4 lg:px-8 flex justify-between py-4">
      <Link href={"/dashboard"} className="text-xl font-semibold">
        everstudy
      </Link>
      <div className="flex gap-3 items-center">
        <Button variant={"outline"} asChild>
          <Link href={"/dashboard/new"}>
            タスクを作成 <Plus />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="border border-input">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/shapes/svg?seed=${
                  user?.first_name || "" + user?.last_name || ""
                }`}
              />
              <AvatarFallback>
                {(user?.first_name || "" + user?.last_name || "").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="py-2 px-3 whitespace-pre">
              {`${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
                "My Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="flex items-center leading-none py-3 px-3"
            >
              <Link href={"/dashboard/setting"}>
                <Settings />
                設定
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="flex items-center leading-none py-3 px-3 w-full"
            >
              <button onClick={handleLogout}>
                <LogOut />
                ログアウト
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
