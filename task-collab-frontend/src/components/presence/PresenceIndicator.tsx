import type { User } from "../../types";

export default function PresenceIndicator({
  users,
}: {
  users: User[];
}) {
  return (
    <div className="flex gap-2">
      {users.map((u) => (
        <div
          key={u._id}
          className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs"
        >
          {u.name[0]}
        </div>
      ))}
    </div>
  );
}
