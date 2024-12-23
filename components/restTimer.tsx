import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function RestTimer({
  dueTime,
  cardClass,
}: {
  dueTime: string;
  cardClass: string;
}) {
  const [restTime, setRestTime] = useState("");

  useEffect(() => {
    const due = new Date(dueTime);
    const interval = setInterval(() => {
      const now = new Date();

      const day = Math.floor(
        (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      const hour = Math.floor(
        ((due.getTime() - now.getTime()) % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (((due.getTime() - now.getTime()) % (1000 * 60 * 60 * 24)) %
          (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const seconds = Math.floor(
        ((((due.getTime() - now.getTime()) % (1000 * 60 * 60 * 24)) %
          (1000 * 60 * 60)) %
          (1000 * 60)) /
          1000
      );

      if (day > 1) {
        const time = day + "日" + hour + "時間";
        setRestTime(time);
      } else {
        const time = hour + "時間" + minutes + "分" + seconds + "秒";
        setRestTime(time);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dueTime]);

  return (
    <div className={`flex gap-1 items-center ${cardClass}`}>
      <Clock className="size-4" />
      <p className="leading-none tracking-wide">残り{restTime}</p>
    </div>
  );
}
