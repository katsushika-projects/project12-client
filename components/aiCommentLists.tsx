"use client";
import { api } from "@/lib/axios";
import { Comment } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import AiComment from "./aiComment";
import { useParams } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

export default function AiCommentLists() {
  const [comments, setComments] = useState<Comment[]>([]);
  const startTimeRef = useRef(new Date());
  const startTime = startTimeRef.current;
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

  // 並び替えて、ページ読み込み後のコメントだけに絞る
  const filtered = comments
    .slice()
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .filter((comment) => new Date(comment.created_at) >= startTime);

  // 累積 minutes を計算
  let totalMinutes = 0;
  const commentsWithElapsed = filtered.map((comment) => {
    totalMinutes += comment.minutes; // ← 累積していく！
    return {
      ...comment,
      minutes: totalMinutes,
    };
  });

  if (!taskId) return;
  return (
    <ScrollArea className="max-h-64 lg:max-h-80 xl:max-h-96 2xl:max-h-[28rem] h-full">
      {commentsWithElapsed.reverse().map((comment) => (
        <AiComment key={comment.id} comment={comment} />
      ))}
    </ScrollArea>
  );
}
