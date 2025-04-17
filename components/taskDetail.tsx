"use client";
import AiCommentLists from "./aiCommentLists";
import { Progress } from "./ui/progress";
import { useCallback, useEffect, useState } from "react";
import { Task } from "@/types";
import { api } from "@/lib/axios";
import { useParams } from "next/navigation";
import RestTimer from "./restTimer";

export default function TaskDetail() {
  const [task, setTask] = useState<Task>();
  const params = useParams();
  const taskId = params.taskId;

  const fetchTask = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.get(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setTask(data);
    } catch (error) {
      console.error(error);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();

    const handleFetchAiCommentLists = () => {
      fetchTask();
    };

    // video.tsxで作ったイベントを監視してコメントを取得
    window.addEventListener("fetchAiCommentLists", handleFetchAiCommentLists);
    return () => {
      window.removeEventListener(
        "fetchAiCommentLists",
        handleFetchAiCommentLists
      );
    };
  }, [taskId, fetchTask]);

  return (
    <div className="py-4 md:py-0 md:w-2/6 md:max-w-sm space-y-5 lg:space-y-8">
      <div className="space-y-2.5">
        <div className="flex justify-between gap-3 flex-wrap items-center">
          <h2 className="font-bold text-xl lg:text-2xl">{task?.name}</h2>
          <p className="font-semibold text-sm lg:text-base text-muted-foreground">
            {task?.fine}円
          </p>
        </div>
        <div className={`flex gap-1 items-center text-muted-foreground`}>
          <RestTimer dueTime={task?.due_time || ""} cardClass={"default"} />
        </div>
        <div className="pt-2 md:pt-3 space-y-1 md:space-y-2">
          <Progress
            value={Math.floor(
              ((task?.achieved_minutes || 0) / (task?.target_minutes || 0)) *
                100
            )}
          />
          <div className="flex justify-between items-center">
            <div className="md:text-lg">
              {String(Math.floor((task?.achieved_minutes || 0) / 60)).padStart(
                2,
                "0"
              )}
              :
              {String(Math.floor((task?.achieved_minutes || 0) % 60)).padStart(
                2,
                "0"
              )}{" "}
              <span className="text-muted-foreground">/</span>{" "}
              {String(Math.floor((task?.target_minutes || 0) / 60)).padStart(
                2,
                "0"
              )}
              :
              {String(Math.floor((task?.target_minutes || 0) % 60)).padStart(
                2,
                "0"
              )}
            </div>
            <div className="md:text-lg">
              {Math.floor(
                Math.min(
                  ((task?.achieved_minutes || 0) /
                    (task?.target_minutes || 0)) *
                    100,
                  100
                )
              )}
              %
            </div>
          </div>
        </div>
      </div>
      <AiCommentLists />
    </div>
  );
}
