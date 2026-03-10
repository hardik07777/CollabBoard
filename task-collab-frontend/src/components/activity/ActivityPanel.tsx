import type { Activity } from "../../types";

function formatTime(date: string) {
  const d = new Date(date);
  return d.toLocaleString();
}

function renderMessage(a: Activity) {
  const userName = a.user?.name || "Someone";

  switch (a.action) {
    case "TASK_CREATED":
      return `${userName} created task "${a.meta?.title}"`;

    case "TASK_MOVED":
      return `${userName} moved a task`;

    case "TASK_UPDATED":
      return `${userName} updated a task`;

    case "TASK_DELETED":
      return `${userName} deleted task "${a.meta?.title}"`;

    case "MEMBER_INVITED":
      return `${userName} invited ${a.meta?.invitedEmail}`;

    default:
      return `${userName} performed ${a.action}`;
  }
}

export default function ActivityPanel({
  activities,
  onClose,
}: {
  activities: Activity[];
  onClose: () => void;
}) {
  return (
    <div className="relative w-80 bg-white border-l border-slate-200 p-6 h-full overflow-y-auto">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-4 text-slate-400 hover:text-slate-700 text-sm transition"
      >
        Close
      </button>

      <h2 className="text-lg font-semibold text-slate-800 mb-6">
        Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-sm text-slate-500">
          No activity yet.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((a) => (
            <div
              key={a._id}
              className="text-sm border-b border-slate-100 pb-3"
            >
              <p className="text-slate-700">
                {renderMessage(a)}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {formatTime(a.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}