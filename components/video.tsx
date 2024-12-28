"use client";
import TVSignin from "./icons/tv_signin";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useParams } from "next/navigation";
import { formDataApi } from "@/lib/axios";
import useWebcam from "@/hooks/useWebcam";
import { useEffect, useRef } from "react";

const randomMinutes = () => {
  const minCeiled = Math.ceil(3);
  const maxFloored = Math.floor(6);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

export default function Video() {
  const { videoRef, isWebcamStarted, setIsWebcamStarted } = useWebcam();
  const params = useParams();
  const taskId = params.taskId;
  const intervalTimeRef = useRef(randomMinutes());

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startTimeout = () => {
      console.log("startTimeout");
      timeoutId = setTimeout(() => {
        captureImage();

        // 次のキャプチャまでの間隔をランダムに設定
        intervalTimeRef.current = randomMinutes();
        startTimeout();
      }, intervalTimeRef.current * 60 * 1000);
    };

    startTimeout();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // 画像をキャプチャする関数
  const captureImage = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
        if (blob) {
          // formData に画像データを追加して POST リクエストを送信
          const formData = new FormData();
          formData.append("image", blob, "captured_image.png");
          formData.append("minutes", String(intervalTimeRef.current));

          try {
            const token = localStorage.getItem("access_token");
            if (!token) return;
            const res = await formDataApi.post(
              `/api/tasks/${taskId}/logs/`,
              formData,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // aiCommentLists.tsxでgetリクエストを実行するためのコードを追加
            const event = new CustomEvent("fetchAiCommentLists");
            window.dispatchEvent(event);

            const data = res.data;
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className="aspect-video overflow-hidden relative">
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className={`w-full h-full rounded-md ${
            isWebcamStarted ? "visible" : "invisible"
          }`}
        />
        {!isWebcamStarted && (
          <div className="bg-neutral-200 flex flex-col gap-4 justify-center items-center h-full w-full rounded-md absolute inset-0">
            <TVSignin className="fill-muted-foreground" />
            <h3 className="text-2xl font-bold">カメラ映像を非表示</h3>
          </div>
        )}
      </div>
      <div className="pt-2 flex flex-wrap gap-2 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          ※画面の表示・非表示に関わらず、カメラの映像を取得しています
        </p>
        <div className="flex items-center gap-1">
          <Label htmlFor="show-video" className="leading-none">
            画面を表示する
          </Label>
          <Switch
            id="show-video"
            onCheckedChange={() => setIsWebcamStarted(!isWebcamStarted)}
            checked={isWebcamStarted}
          />
        </div>
      </div>
    </div>
  );
}
