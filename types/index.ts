export type Task = {
  id: string;
  name: string;
  fine: number;
  status: string;
  start_time: string;
  due_time: string;
  target_minutes: number;
  achieved_minutes: number;
  requires_new_task_creation: boolean;
  new_task_created: boolean;
  created_at: string;
  updated_at: string;
  user: string;
};
