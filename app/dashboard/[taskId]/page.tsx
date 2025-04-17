import TaskDetail from "@/components/taskDetail";
import { Button } from "@/components/ui/button";
import Video from "@/components/video";
import { DoorClosed } from "lucide-react";
import Link from "next/link";

export default function Studying() {
  return (
    <div className="px-4 lg:px-8 pt-0 md:pt-10 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 lg:gap-6 h-fit">
        <Video />
        <TaskDetail />
      </div>

      <div className="py-10 text-end">
        <Button
          variant={"destructive"}
          className="flex-col h-12 pt-1 pb-1.5 [&_svg]:size-6 gap-1 text-xs/none font-medium"
          asChild
        >
          <Link href={"/dashboard"}>
            <DoorClosed />
            作業終了
          </Link>
        </Button>
      </div>
    </div>
  );
}
