import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Check, ChevronRight, Clock } from "lucide-react";
import { Progress } from "./ui/progress";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

const taskCardVariant = cva("", {
  variants: {
    variant: {
      default: "bg-background",
      danger: "bg-destructive/5 border-destructive",
      success: "bg-green-500/5 border-green-500",
      failure: "bg-background relative",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props = VariantProps<typeof taskCardVariant>;

const TaskCard = ({ variant }: Props) => {
  const cardClass = clsx(
    "",
    variant === "default" && "text-muted-foreground",
    variant === "danger" && "text-destructive",
    variant === "success" && "text-green-600"
  );

  return (
    <Card className={taskCardVariant({ variant })}>
      <CardHeader className="flex-row justify-between space-y-0 p-8 pb-2.5 gap-4 flex-wrap">
        <CardTitle className="text-2xl">タスク名</CardTitle>
        <div className={`font-semibold ${cardClass}`}>500円</div>
      </CardHeader>
      <CardContent className="px-8">
        <div className={`flex gap-1 items-center ${cardClass}`}>
          <Clock className="size-4" />
          <p className="leading-none">残り02日08時間24分34秒</p>
        </div>
        <div className="pt-8 space-y-2">
          <Progress
            value={43}
            indicatorClassName={clsx(
              "bg-primary",
              variant === "danger" && "bg-destructive",
              variant === "success" && "bg-green-600"
            )}
          />
          <div className="flex justify-between items-center">
            <div className="text-lg">
              00:54 <span className="text-muted-foreground">/</span> 02:00
            </div>
            <div className="text-lg">43%</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-8 pt-0">
        {variant === "success" ? (
          <div className="flex gap-2 items-center">
            <Check className="text-green-600" />
            新しいタスク作成済み
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Check className="text-neutral-300" />
            新しいタスク未作成
          </div>
        )}
        <Button
          variant={variant === "danger" ? "destructive" : "default"}
          className={
            variant === "success" || variant === "failure" ? "hidden" : "flex"
          }
        >
          取り組む <ChevronRight />
        </Button>
      </CardFooter>
      {variant === "failure" && (
        <div className="absolute inset-0 bg-black/40 rounded-xl text-white font-semibold flex flex-col justify-center items-center">
          <div className="space-y-5">
            <p className="text-xl">達成ならず...</p>
            <p className="text-6xl px-14">
              -500<span className="text-3xl">円</span>
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TaskCard;
