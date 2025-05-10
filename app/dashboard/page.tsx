"use client";
import Loading from "@/components/loading";
import Overview from "@/components/overview";
import TaskCard from "@/components/taskCard";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { Task } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const paymentStatus = searchParams.get("payment");
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await api.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTasks();
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (paymentStatus === "success" && taskId) {
      const verify = async () => {
        const token = localStorage.getItem("access_token");
        toast.promise(
          await api.post(
            `/api/tasks/${taskId}/verify-and-start/`,
            { task_id: taskId },
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          {
            loading: "決済を確認中です...",
            success: "決済成功！タスクが開始されました！",
            error: "決済確認中にエラーが発生しました",
          }
        );

        fetchTasks();
        router.replace("/dashboard", { scroll: false });
      };

      verify();
    }
    if (paymentStatus === "cancel" && taskId) {
      toast.error("決済がキャンセルされました");
    }
  }, [paymentStatus, taskId, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 lg:px-8 md:py-10 space-y-4 md:space-y-8">
      <Overview />
      {tasks.length > 0 ? (
        <ul className="space-y-4 md:space-y-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              variant={
                task.status === "D"
                  ? "success"
                  : task.status === "F"
                  ? "failure"
                  : Math.floor(
                      (new Date(task.due_time).getTime() -
                        new Date().getTime()) /
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
