import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full px-4 lg:px-8 flex justify-between py-4">
      <Link href={"/dashboard"} className="text-xl font-semibold">
        everstudy
      </Link>
      <Button variant={"outline"} asChild>
        <Link href={"/dashboard/new"}>
          タスクを作成 <Plus />
        </Link>
      </Button>
    </div>
  );
};

export default Header;
