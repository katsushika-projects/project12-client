"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";

export default function Page() {
  const handleDeleteAccount = async () => {
    // 退会処理
    const result = confirm("本当に退会しますか？ この操作は取り消せません");
    if (!result) return;
    try {
      await api.delete("/api/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 py-5">
      <h1 className="text-2xl font-semibold pb-6">設定</h1>

      <div className="py-5 flex justify-between items-center flex-wrap gap-2">
        <div className="space-y-1">
          <h3 className="text-lg">退会</h3>
          <p className="text-sm text-muted-foreground">
            ※ 退会するとデータが削除されます
          </p>
        </div>
        <Button onClick={handleDeleteAccount} variant={"destructive"}>
          アカウントを削除
        </Button>
      </div>
    </div>
  );
}
