import Overview from "@/components/overview";
import TaskCard from "@/components/taskCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const page = () => {
  const task = true;
  return (
    <div className="mx-auto max-w-screen-lg px-4 lg:px-8 py-10 space-y-10">
      <Overview />
      {task ? (
        <>
          <TaskCard variant="default" />
          <TaskCard variant="danger" />
          <TaskCard variant="success" />
          <TaskCard variant="failure" />
        </>
      ) : (
        <div className="text-2xl leading-relaxed text-center flex flex-col justify-center items-center py-10">
          <p>タスクが1つもありません</p>
          <p>作成して学び始めよう！</p>
          <Button
            variant={"outline"}
            asChild
            size={"lg"}
            className="text-base mt-8"
          >
            <Link href={"/dashboard/new"}>
              タスクを作成 <Plus />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
