// import type { ReactNode } from "react";

// export default function BoardLayout({
//   children,
//   activity,
//   presence,
// }: {
//   children: ReactNode;
//   activity: ReactNode;
//   presence: ReactNode;
// }) {
//   return (
//     <div className="flex h-screen">
//       <div className="flex-1 overflow-x-auto p-6">
//         {presence}
//         <div className="flex gap-4 mt-4">{children}</div>
//       </div>

//       <div className="w-80 border-l p-4 bg-gray-50">
//         {activity}
//       </div>
//     </div>
//   );
// }
import type { ReactNode } from "react";

export default function BoardLayout({
  children,
  activity,
  presence,
}: {
  children: ReactNode;
  activity: ReactNode;
  presence: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 ">
      
      {/* Main Board Area */}
      <div className="flex-1 flex flex-col overflow-hidden no-scrollbar">
        
        {/* Presence Bar */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b px-6 py-3 shadow-sm">
          {presence}
        </div>

        {/* Lists Section */}
        <div className="flex-1 overflow-x-auto no-scrollbar overflow-y-hidden px-6 py-6">
          <div className="flex gap-6 min-w-max">
            {children}
          </div>
        </div>
      </div>

      {/* Activity Panel */}
      <div className="w-80 border-l bg-white shadow-xl flex flex-col">
        <div className="sticky top-0 bg-white border-b px-4 py-3 font-semibold text-gray-700">
          Activity
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activity}
        </div>
      </div>
    </div>
  );
}

