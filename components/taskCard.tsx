import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Check, ChevronRight } from "lucide-react";
import { Progress } from "./ui/progress";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Task } from "@/types";
import RestTimer from "./restTimer";
import Link from "next/link";

const taskCardVariant = cva("", {
  variants: {
    variant: {
      default: "bg-background border-black/10",
      danger: "bg-destructive/5 border-black/10",
      success: "bg-green-500/5 border-black/10",
      failure: "bg-background relative",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props = VariantProps<typeof taskCardVariant> & { task: Task };

const TaskCard = ({ variant, task }: Props) => {
  const cardClass = clsx(
    "",
    variant === "default" && "text-muted-foreground",
    variant === "danger" && "text-destructive",
    variant === "success" && "text-green-600"
  );

  return (
    <Card className={taskCardVariant({ variant })}>
      <CardHeader className="flex-row justify-between space-y-0 p-5 pb-3 md:p-8 md:pb-4 gap-4 flex-wrap">
        <CardTitle className="text-base md:text-2xl">{task.name}</CardTitle>
        <div className={`font-semibold md:text-base text-sm ${cardClass}`}>
          {task.fine}円
        </div>
      </CardHeader>
      <CardContent className="px-5 md:px-8 pb-3 md:pb-6">
        {task.status === "I" && (
          <div className="pb-3 md:pb-5">
            <RestTimer dueTime={task.due_time} cardClass={cardClass} />
          </div>
        )}
        <div className="space-y-1 md:space-y-2 pt-1">
          <Progress
            value={Math.floor(
              (task.achieved_minutes / task.target_minutes) * 100
            )}
            indicatorClassName={clsx(
              "bg-primary",
              variant === "danger" && "bg-destructive",
              variant === "success" && "bg-green-600"
            )}
          />
          <div className="flex justify-between items-center">
            <div className="md:text-lg">
              {String(Math.floor(task.achieved_minutes / 60)).padStart(2, "0")}:
              {String(Math.floor(task.achieved_minutes % 60)).padStart(2, "0")}{" "}
              <span className="text-muted-foreground">/</span>{" "}
              {String(Math.floor(task.target_minutes / 60)).padStart(2, "0")}:
              {String(Math.floor(task.target_minutes % 60)).padStart(2, "0")}
            </div>
            <div className="md:text-lg">
              {Math.floor(
                Math.min(
                  (task.achieved_minutes / task.target_minutes) * 100,
                  100
                )
              )}
              %
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-5 md:p-8 pt-0 md:pt-0">
        {task.new_task_created ? (
          <div className="flex gap-1 md:gap-2 items-center text-sm md:text-base">
            <Check className="text-green-600 md:size-6 size-4" />
            新しいタスク作成済み
          </div>
        ) : (
          <div className="flex gap-1 md:gap-2 items-center text-sm md:text-base">
            <Check className="text-neutral-300 md:size-6 size-4" />
            新しいタスク未作成
          </div>
        )}
        <Button
          variant={variant === "danger" ? "destructive" : "default"}
          className={
            variant === "success" || variant === "failure" ? "hidden" : "flex"
          }
          asChild
        >
          <Link href={`/dashboard/${task.id}`}>
            取り組む <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
      {variant === "failure" && (
        <div className="absolute inset-0 bg-black/55 rounded-xl text-white flex flex-col justify-center items-center">
          <div className="space-y-5">
            <p className="text-lg md:text-2xl font-medium">達成ならず...</p>

            {task.fine > 0 && (
              <p className="text-6xl px-14 font-bold">
                {"-" + task.fine}
                <span className="text-3xl pl-1">円</span>
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default TaskCard;
