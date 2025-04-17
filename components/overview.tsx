import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

type Summary = {
  id: string;
  total_achieved_minutes: number;
  total_challenge_amount: number;
  total_loss_amount: number;
};

const Overview = () => {
  const [summary, setSummary] = useState<Summary>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setSummary(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex gap-y-2 flex-wrap md:flex-nowrap md:divide-x divide-y md:divide-y-0">
      <div className="py-3 md:py-4 px-6 space-y-2 md:space-y-5 text-center w-full grow">
        <h3>総学習時間</h3>
        <div className="space-x-1">
          <span className="text-2xl md:text-3xl">
            {Math.floor((summary?.total_achieved_minutes || 0) / 60)}
          </span>
          <span className="text-base md:text-xl">時間</span>
          <span className="text-2xl md:text-3xl">
            {(summary?.total_achieved_minutes || 0) % 60}
          </span>
          <span className="text-base md:text-xl">分</span>
        </div>
      </div>
      <div className="py-4 px-6 space-y-2 md:space-y-5 text-center w-1/2 md:w-full">
        <h3>総挑戦金額</h3>
        <div className="space-x-1">
          <span className="text-2xl md:text-3xl">
            {summary?.total_challenge_amount}
          </span>
          <span className="text-base md:text-xl">円</span>
        </div>
      </div>
      <div className="py-4 px-6 space-y-2 md:space-y-5 text-center w-1/2 md:w-full">
        <h3>総失敗金額</h3>
        <div className="space-x-1">
          <span className="text-2xl md:text-3xl">
            {summary?.total_loss_amount}
          </span>
          <span className="text-base md:text-xl">円</span>
        </div>
      </div>
    </div>
  );
};

export default Overview;
