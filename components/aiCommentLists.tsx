"use client";
import { api } from "@/lib/axios";
import { Comment } from "@/types";
import { useCallback, useEffect, useState } from "react";
import AiComment from "./aiComment";
import { useParams } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

export default function AiCommentLists() {
  const [comments, setComments] = useState<Comment[]>([]);
  const params = useParams();
  const taskId = params.taskId;

  const getComments = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await api.get(`/api/tasks/${taskId}/logs/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [taskId]);

  useEffect(() => {
    getComments();

    const handleFetchAiCommentLists = () => {
      getComments();
    };

    // video.tsxで作ったイベントを監視してコメントを取得
    window.addEventListener("fetchAiCommentLists", handleFetchAiCommentLists);
    return () => {
      window.removeEventListener(
        "fetchAiCommentLists",
        handleFetchAiCommentLists
      );
    };
  }, [taskId, getComments]);

  if (!taskId) return;
  return (
    <ScrollArea className="max-h-64 lg:max-h-80 xl:max-h-96 2xl:max-h-[28rem] h-full">
      {comments.map((comment) => (
        <AiComment key={comment.id} comment={comment} />
      ))}
    </ScrollArea>
  );
}
