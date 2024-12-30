"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";

export default function Page() {
  const handleDeleteAccount = async () => {
    // 退会処理
    const result = confirm("本当に退会しますか？ この操作は取り消せません");
    if (!result) return;
    try {
      const res = await api.delete("/api/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold">設定</h1>
      <div className="py-6 space-y-2">
        <div className="flex gap-2 items-baseline flex-wrap">
          <h3 className="font-semibold">退会</h3>
          <p className="text-sm text-muted-foreground">
            ※この操作を取り消すことはできません
          </p>
        </div>
        <Button onClick={handleDeleteAccount} variant={"destructive"}>
          アカウントを削除
        </Button>
      </div>
    </div>
  );
}
