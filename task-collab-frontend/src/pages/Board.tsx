import { useParams } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

import { getBoardData } from "../api/board.api";
import { createList } from "../api/list.api";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  moveTask,
} from "../api/task.api";
// import { useSocket } from "../api/hooks/useSocket";
import { TaskCard } from "../components/task/TaskCard";
import type { Task } from "../types";
import ActivityPanel from "../components/activity/ActivityPanel";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useBoardRoom } from "@/api/hooks/useBoardRoom";
import { useGlobalSocket } from "@/api/hooks/useGlobalSocket";
import { DotPattern} from "@/components/fog";

export default function Board() {

const [showActivity, setShowActivity] = useState(false);

const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
const socket = useGlobalSocket();
useBoardRoom(socket, id);
  const [listTitle, setListTitle] = useState("");
  const [taskInputs, setTaskInputs] = useState<Record<string, string>>({});

  // Fetch board
  const { data, isLoading } = useQuery({
    queryKey: ["board", id],
    queryFn: async () => (await getBoardData(id!)).data,
  });

  // activities
  const { data: activityResponse } = useQuery({
  queryKey: ["activity", id],
  queryFn: async () => {
        const res = await axios.get(`/activity/boards/${id}/activity`);

    return res.data;
  },
  enabled: !!id,
});

const activities = activityResponse?.data || [];
// console.log("Activity full response:", activityResponse);
// console.log("Extracted activities:", activities);

  // Create list
  const createListMutation = useMutation({
  mutationFn: (title: string) => createList(id!, title),

  onSuccess: (response) => {
    const newList = response.data;

    queryClient.setQueryData(["board", id], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        lists: [...(oldData.lists || []), newList],
      };
    });
  },
});
// Delete board
const handleDeleteBoard = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this board?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`/boards/${id}`);
    navigate("/dashboard"); // change route if needed
  } catch (error) {
    console.error("Failed to delete board", error);
  }
};

  // Create task
  const createTaskMutation = useMutation({
    mutationFn: ({ listId, title }: { listId: string; title: string }) =>
    createTask({ listId, title }),
    
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.listId],
      }),
  });

  // Move task
  const moveTaskMutation = useMutation({
  mutationFn: moveTask,

  onMutate: async (variables: any) => {
    await queryClient.cancelQueries({
      queryKey: ["tasks", variables.sourceListId],
    });

    const previousTasks = queryClient.getQueryData([
      "tasks",
      variables.sourceListId,
    ]);

    // optimistic update
    queryClient.setQueryData(
      ["tasks", variables.sourceListId],
      (old: any) => {
        if (!old) return old;

        const updated = [...old];
        const moved = updated.splice(variables.sourceIndex, 1)[0];
        updated.splice(variables.newOrder, 0, moved);

        return updated;
      }
    );

    return { previousTasks };
  },

  onError: (_err, variables, context) => {
    if (context?.previousTasks) {
      queryClient.setQueryData(
        ["tasks", variables.sourceListId],
        context.previousTasks
      );
    }
  },

  onSettled: (_data, _err, variables) => {
    queryClient.invalidateQueries({
      queryKey: ["tasks", variables.sourceListId],
    });
  },
});

  

  // Drag handler
  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    moveTaskMutation.mutate({
      taskId: draggableId,
      sourceListId: source.droppableId,
      destinationListId: destination.droppableId,
      newOrder: destination.index,
    });
  };
  const [inviteEmail, setInviteEmail] = useState("");

const inviteMutation = useMutation({
  mutationFn: (data: { email: string; role: string }) =>
  axios.post(`/boards/${id}/invite`, data),
  onSuccess: () => {
    setInviteEmail("");
  },
});

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const refetch = () =>
      queryClient.invalidateQueries({ 
    predicate: (query) => query.queryKey[0] === "tasks",
     });

    socket.on("task:created", refetch);
    socket.on("task:moved", refetch);
    socket.on("task:updated", refetch);
    socket.on("task:deleted", refetch);

     // ✅ NEW: member invited event
  socket.on("member:invited", ({ member }) => {
    queryClient.setQueryData(["board", id], (old: any) => {
      if (!old) return old;

      return {
        ...old,
        members: [...old.members, member],
      };
    });
  });

    return () => {
      socket.off("task:created", refetch);
      socket.off("task:moved", refetch);
      socket.off("task:updated", refetch);
      socket.off("task:deleted", refetch);
    };
  }, [socket, queryClient]);
const [inviteRole, setInviteRole] = useState("member");

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Board not found</div>;
  

return (
  <div className="relative min-h-screen overflow-hidden ">

    {/* Background */}
<DotPattern />
    {/* Your Board UI */}
<div className="relative z-10 min-h-screen px-10 py-8 ">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-12">

        <div>
          <div className="inline-block bg-gray-100 px-6 py-3 rounded-xl border border-gray-200">

          <h1 className="text-lg font-medium text-slate-600 hover:text-slate-900 transition">
            {data.title}
          </h1>
          </div>


          {showActivity && (
            <div className="absolute right-0 top-0 bottom-0 z-40">
              <ActivityPanel 
                activities={activities}
                onClose={() => setShowActivity(false)}
              />
            </div>
          )}
        </div>
        <div className="inline-block bg-gray-100 px-6 py-3 rounded-xl border border-gray-200">

        <button
          onClick={() => setShowActivity((prev) => !prev)}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
        >
          Activity
        </button>
        </div>

        {/* <button
          onClick={handleDeleteBoard}
          className="text-sm font-medium text-red-600 hover:text-red-800 transition"
        >
          Delete Board
        </button> */}

      </div>
      
     <div className="flex items-center gap-10 mb-12">

 
  {/* ADD LIST */}
  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm w-fit">

  <input
    value={listTitle}
    onChange={(e) => setListTitle(e.target.value)}
    placeholder="Add another list..."
    className="outline-none text-sm px-2 py-1 w-64 placeholder:text-slate-400"
  />

  <button
    onClick={() => {
      if (!listTitle.trim()) return;
      createListMutation.mutate(listTitle);
      setListTitle("");
    }}
    className="bg-slate-900 hover:bg-slate-800 transition text-white text-sm px-4 py-1.5 rounded-md font-medium"
  >
    Add
  </button>

</div>
   {/* Invite */}
 <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm w-fit">

  <input
    value={inviteEmail}
    onChange={(e) => setInviteEmail(e.target.value)}
    placeholder="Invite by email..."
    className="outline-none text-sm px-2 py-1 w-56 placeholder:text-slate-400"
  />

  <select
    value={inviteRole}
    onChange={(e) => setInviteRole(e.target.value)}
    className="text-sm border border-slate-200 rounded-md px-2 py-1 bg-slate-50 hover:bg-slate-100 transition"
  >
    <option value="member">Member</option>
    <option value="admin">Admin</option>
  </select>

  <button
    onClick={() => {
      if (!inviteEmail.trim()) return;
      inviteMutation.mutate({
        email: inviteEmail,
        role: inviteRole,
      });
    }}
    className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-4 py-1.5 rounded-md font-medium"
  >
    Invite
  </button>

</div>


</div>

      <DragDropContext onDragEnd={handleDragEnd}>
  <div className="flex gap-6 overflow-x-auto no-scrollbar overflow-y-hidden pb-6 items-start h-[calc(100vh-220px)]">
                 {data.lists.map((list: any) => (
            <ListColumn
              key={list._id}
              list={list}
              boardMembers={data.members}
              taskInputs={taskInputs}
              setTaskInputs={setTaskInputs}
              createTaskMutation={createTaskMutation}
            />
          ))}
        </div>
      </DragDropContext>

    </div>
  </div>
);
}

type ListColumnProps = {
  list: any;
  boardMembers: any[];
  taskInputs: Record<string, string>;
  setTaskInputs: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  createTaskMutation: any;
};

function ListColumn({
  list,
  boardMembers,
  taskInputs,
  setTaskInputs,
  createTaskMutation,
}: ListColumnProps) {
  const queryClient = useQueryClient();

  const deleteListMutation = useMutation({
  mutationFn: (listId: string) =>
    axios.delete(`/lists/${listId}`),

  onSuccess: (_data, listId) => {
    queryClient.setQueriesData(
  { queryKey: ["board"], exact: false },
  (oldData: any) => {
    if (!oldData) return oldData;

      return {
        ...oldData,
        lists: oldData.lists.filter(
          (l: any) => l._id !== listId
        ),
      };
    });
  },
});
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", list._id],
    queryFn: () => getTasks(list._id),
    // select: (res) => res.data.data,
  });
  console.log("Tasks for list", list._id, tasks);

  // Delete task
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks", list._id],
      }),
  });

  // Update task
  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      title,
    }: {
      taskId: string;
      title: string;
    }) => updateTask(taskId, { title }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks", list._id],
      }),
  });

 return (
<div className="w-[320px] flex-shrink-0 bg-white rounded-2xl border border-slate-200 p-4 flex flex-col max-h-[80vh]">    {/* LIST TITLE */}
    <div className="flex justify-between items-center mb-5">
  <h2 className="font-semibold text-gray-700 tracking-wide">
    {list.title}

  </h2>
  <button
    onClick={() => {
      const confirmDelete = window.confirm(
        "Delete this list and all its tasks?"
      );
      if (!confirmDelete) return;

      deleteListMutation.mutate(list._id);
    }}
    className="text-gray-400 hover:text-red-500 transition text-sm"
  >
    ✕
  </button>

 
</div>

    <Droppable droppableId={list._id} direction="vertical" type = "task">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col gap-3 pr-1 mb-4 min-h-[20px]"
        >
          {tasks.length === 0 && (
            <p className="text-gray-400 text-sm">
              No tasks yet
            </p>
          )}

          {tasks.map((task: Task, index: number) => (
  <Draggable key={task._id} draggableId={task._id} index={index}>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        zIndex: snapshot.isDragging ? 9999 : "auto"
      }}
      className={snapshot.isDragging ? "shadow-2xl rotate-1 scale-105" : ""}
    >
      <TaskCard
        task={task}
        listId={list._id}
        boardMembers={boardMembers}
        onDelete={() => deleteTaskMutation.mutate(task._id)}
        onUpdate={(title: string) =>
          updateTaskMutation.mutate({
            taskId: task._id,
            title,
          })
        }
      />
    </div>
  )}
</Draggable>


          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>

    {/* ADD TASK INPUT */}
    <input
      value={taskInputs[list._id] || ""}
      onChange={(e) =>
        setTaskInputs({
          ...taskInputs,
          [list._id]: e.target.value,
        })
      }
      placeholder="Add a task..."
      className="bg-white border border-gray-200 p-2 w-full text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
    />

    <button
  onClick={() => {
    const title = taskInputs[list._id]?.trim();
    if (!title) return;

    createTaskMutation.mutate(
      { listId: list._id, title },
      {
        onSuccess: () => {
          setTaskInputs((prev) => ({
            ...prev,
            [list._id]: "",
          }));
        },
      }
    );
  }}
  className="text-sm text-indigo-600 mt-3 hover:text-indigo-800 transition font-medium"
>
  + Add Task
</button>



  </div>
);

}
