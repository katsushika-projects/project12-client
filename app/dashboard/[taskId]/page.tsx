import AiCommentLists from "@/components/aiCommentLists";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Video from "@/components/video";
import { Clock, DoorClosed } from "lucide-react";
import Link from "next/link";

export default function Studying() {
  return (
    <div className="px-4 lg:px-8 pt-0 md:pt-10 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 lg:gap-6 h-fit">
        <Video />
        <div className="md:w-2/6 md:max-w-sm space-y-5 lg:space-y-8">
          <div className="space-y-2.5">
            <div className="flex justify-between gap-3 flex-wrap items-center">
              <h2 className="font-bold text-xl lg:text-2xl">タスク名</h2>
              <p className="font-semibold text-sm lg:text-base text-muted-foreground">
                0円
              </p>
            </div>
            <div className={`flex gap-1 items-center text-muted-foreground`}>
              <Clock className="size-4" />
              <p className="leading-none tracking-wide text-sm lg:text-base">
                残り2日8時間24分34秒
              </p>
            </div>
            <div className="py-3 lg:py-5 space-y-1.5">
              <Progress className="h-2.5" value={48} />
              <div className="flex justify-between items-center">
                <div className="text-base lg:text-xl">
                  00:54 <span className="text-muted-foreground">/</span> 02:00
                </div>
                <div className="text-base lg:text-xl">48%</div>
              </div>
            </div>
          </div>
          <AiCommentLists />
        </div>
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
