"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, CircleHelp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "タスク名は必須です")
    .max(40, "40文字以内で入力してください"),
  fine: z.coerce.number(),
  target_minutes: z.number().positive("1分以上を入力してください"),
  requires_new_task_creation: z.boolean(),
});

const CreateTask = () => {
  const [checked, setChecked] = useState(false);
  const [selectTime, setSelectTime] = useState({ hour: 0, min: 0 });
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fine: 0,
      target_minutes: 0,
      requires_new_task_creation: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      await api.post("/api/tasks/", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    form.setValue("target_minutes", selectTime.hour * 60 + selectTime.min);
  }, [selectTime, form]);

  return (
    <div className="max-w-screen-sm mx-auto px-6 py-10">
      <h1 className="font-bold text-2xl pb-8">タスク作成</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タスク名</FormLabel>
                <FormControl>
                  <Input placeholder="例) TOEICの勉強" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fine"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  金額
                  <TooltipProvider delayDuration={400}>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <CircleHelp
                          size={16}
                          className="text-muted-foreground"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-center">
                          このタスクが達成できなかった際に
                          <br />
                          支払わなければいけない金額です
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>

                <div className="flex gap-2 items-center">
                  <FormControl>
                    <Input placeholder="0" {...field} className="max-w-32" />
                  </FormControl>
                  <FormLabel>円</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="target_minutes"
            render={() => (
              <FormItem>
                <FormLabel>目標作業時間</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex gap-2 items-center">
                      <div className="relative">
                        <Input
                          placeholder="0"
                          className="max-w-32"
                          value={selectTime.hour}
                          onChange={(e) =>
                            setSelectTime({
                              ...selectTime,
                              hour: Number(e.target.value),
                            })
                          }
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            className="absolute right-0 top-0"
                          >
                            <Button size={"icon"} variant={"ghost"}>
                              <ChevronsUpDown className="text-neutral-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" align="end">
                            <DropdownMenuRadioGroup
                              value={String(selectTime.hour)}
                              onValueChange={(e) =>
                                setSelectTime({
                                  ...selectTime,
                                  hour: Number(e),
                                })
                              }
                            >
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                (item) => (
                                  <DropdownMenuRadioItem
                                    value={String(item)}
                                    key={item}
                                  >
                                    {item}
                                  </DropdownMenuRadioItem>
                                )
                              )}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      時間
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="relative">
                        <Input
                          placeholder="0"
                          className="max-w-32"
                          value={selectTime.min}
                          onChange={(e) =>
                            setSelectTime({
                              ...selectTime,
                              min: Number(e.target.value),
                            })
                          }
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            className="absolute right-0 top-0"
                          >
                            <Button size={"icon"} variant={"ghost"}>
                              <ChevronsUpDown className="text-neutral-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" align="end">
                            <DropdownMenuRadioGroup
                              value={String(selectTime.min)}
                              onValueChange={(e) =>
                                setSelectTime({
                                  ...selectTime,
                                  min: Number(e),
                                })
                              }
                            >
                              {[
                                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
                              ].map((item) => (
                                <DropdownMenuRadioItem
                                  value={String(item)}
                                  key={item}
                                >
                                  {item}
                                </DropdownMenuRadioItem>
                              ))}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      分
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requires_new_task_creation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">タスク達成条件</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-base">
                    新しいタスクの作成を含める
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm">※タイムリミットは作成から120時間(5日間)です</p>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
            />
            <p>
              <Link href={"#"} className="border-b border-muted-foreground">
                利用規約
              </Link>
              と
              <Link href={"#"} className="border-b border-muted-foreground">
                プライバシーポリシー
              </Link>
              に同意する
            </p>
          </div>
          <Button type="submit" disabled={!checked}>
            作成
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTask;
