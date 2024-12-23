"use client";
import Overview from "@/components/overview";
import TaskCard from "@/components/taskCard";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { Task } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg px-4 lg:px-8 py-10 space-y-10">
      <Overview />
      {tasks.length > 0 ? (
        <ul className="space-y-10">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              variant={
                Math.floor(
                  (new Date(task.due_time).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) > 1
                  ? "default"
                  : "danger"
              }
            />
          ))}
        </ul>
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

export default Page;
