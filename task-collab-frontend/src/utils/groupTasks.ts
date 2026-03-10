import type { Task } from "../types";

export const groupTasksByList = (tasks: Task[]) => {
  return tasks.reduce<Record<string, Task[]>>((acc, task) => {
    if (!acc[task.list]) {
      acc[task.list] = [];
    }

    acc[task.list].push(task);
    return acc;
  }, {});
};
