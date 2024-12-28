import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useWebcam() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isWebcamStarted, setIsWebcamStarted] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { aspectRatio: 1.777777778 }, // 16/9の比
        });
        currentStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        setIsWebcamStarted(false);
        console.error(error);
      }
    };
    startWebcam();

    return () => {
      // コンポーネントのクリーンアップ時にカメラストリームを停止
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
      videoRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      videoRef.current = null;
    };
  }, [router]);

  return { videoRef, isWebcamStarted, setIsWebcamStarted };
}
