import { useState } from "react";
import { useAssignTask } from "../../api/hooks/useAssignTask";
import type { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  listId: string;
  boardMembers: {
    _id: string;
    name: string;
  }[];
  onDelete?: () => void;
  onUpdate?: (title: string) => void;
}

export const TaskCard = ({
  task,
  listId,
  boardMembers,
  onDelete,
  onUpdate,
}: TaskCardProps) => {
  const { mutate: assignTask } = useAssignTask(listId);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  // Handle assignment
  const handleAssign = (userId: string) => {
    assignTask({ taskId: task._id, userId });
  };

  // Handle save edit
  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate?.(editTitle);
    setIsEditing(false);
  };

  // Get currently assigned user (if single assignment)
  const currentAssigned =
    Array.isArray(task.assignedTo) && task.assignedTo.length > 0
      ? task.assignedTo[0]._id
      : "";

  return (
    <div className="bg-white p-3 rounded-lg shadow hover:shadow-md transition space-y-2 group">

      {/* TITLE SECTION */}
      {isEditing ? (
        <div className="space-y-2">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border p-1 text-sm rounded"
            autoFocus
          />
          <div className="flex gap-2 text-xs">
            <button
              onClick={handleSave}
              className="text-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div
            className="font-medium text-sm cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {task.title}
          </div>

          {onDelete && (
            <button
              onClick={onDelete}
              className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          )}
        </div>
      )}

      {/* ASSIGN DROPDOWN */}
      {/* <select
        value={currentAssigned}
        onChange={(e) => handleAssign(e.target.value)}
        className="w-full text-xs border rounded p-1"
      >
        <option value="">Unassigned</option>

        {boardMembers.map((member) => (
          <option key={member._id} value={member._id}>
            {member.name}
          </option>
        ))}
      </select> */}

      {/* SHOW ASSIGNED USER AVATAR */}
      {/* {Array.isArray(task.assignedTo) &&
        task.assignedTo.length > 0 && (
          <div className="flex -space-x-2 mt-2">
            {task.assignedTo.map((user: any) => (
              <div
                key={user._id}
                className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center border border-white"
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        )} */}
    </div>
  );
};
