import { useQuery } from "@tanstack/react-query";
import type { Task } from "../../types";
import { TaskCard } from "../task/TaskCard";
import { getTasks } from "../../api/task.api";

interface ListColumnProps {
  title: string;
  listId: string;
  boardMembers: {
    _id: string;
    name: string;
  }[];
}

export default function ListColumn({
  title,
  listId,
  boardMembers,
}: ListColumnProps) {
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", listId],
    queryFn: () => getTasks(listId),
    enabled: !!listId,
    select: (res) => res.data.data,
  });

  return (
    <div
  className="
    w-[320px]
    min-w-[320px]
    flex-shrink-0
    bg-white/85 backdrop-blur-sm
    rounded-2xl
    border border-slate-200
    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
    p-5
    transition hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
  "
>
      {/* LIST HEADER */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-slate-700">
          {title}
        </h2>

        <span className="text-xs text-slate-400">
          {tasks.length}
        </span>
      </div>

      {/* TASK LIST */}
      <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">

        {tasks.length === 0 && (
          <p className="text-xs text-slate-400 text-center py-3">
            No tasks
          </p>
        )}

        {tasks.map((task: Task) => (
          <TaskCard
            key={task._id}
            task={task}
            listId={listId}
            boardMembers={boardMembers}
          />
        ))}
      </div>
    </div>
  );
}