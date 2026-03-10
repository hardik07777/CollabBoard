import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBoards, createBoard } from "../api/board.api";
import { Link } from "react-router-dom";
import { useState } from "react";
import StarfieldBackground from "../components/Grid";
import axios from "../api/axios";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const { data: boards = [], isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const res = await getBoards();
      return res.data.data;
    },
  });

  const mutation = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setName("");
    },
  });
  
  const deleteBoardMutation = useMutation({
    mutationFn: (boardId: string) => axios.delete(`/boards/${boardId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading boards...
      </div>
    );

  return (
    <>
      <StarfieldBackground quantity={160} size={1.2} ease={70} />

      <div className="relative z-10 px-8 py-9">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-12">
            <div className="inline-block bg-gray-100 px-6 py-4 rounded-xl border border-gray-200">
             <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
               Your Boards
             </h1>
            </div>
          </div>

          {/* CREATE BOARD */}
          <div
            className="bg-white/80 backdrop-blur-md
                       rounded-2xl p-8 mb-14
                       border border-black/10
                       shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Create New Board
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter board name..."
                className="flex-1 px-4 py-3 rounded-xl
                           bg-white
                           border border-gray-300
                           text-gray-800 placeholder-gray-400
                           focus:outline-none
                           focus:ring-2 focus:ring-indigo-500
                           focus:border-indigo-500
                           transition"
              />

              <button
                onClick={() => mutation.mutate(name)}
                disabled={!name.trim()}
                className="px-6 py-3 rounded-xl
                           bg-indigo-600 hover:bg-indigo-700
                           disabled:opacity-50 disabled:cursor-not-allowed
                           text-white font-medium
                           shadow-md hover:shadow-lg
                           active:scale-95
                           transition-all duration-200"
              >
                Create Board
              </button>
            </div>
          </div>

          {/* EMPTY STATE */}
          {boards.length === 0 ? (
            <div
              className="bg-white/90 backdrop-blur-sm
                         rounded-2xl p-14 text-center
                         border border-black/10
                         shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                No Boards Yet
              </h3>

              <p className="text-gray-500">
                Create your first board to start collaborating
              </p>
            </div>
          ) : (
            /* BOARDS GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {boards.map((board: any) => (
                <div
                  key={board._id}
                  className="group relative
                             bg-white/85 backdrop-blur-sm
                             rounded-2xl p-7
                             border border-black/10
                             shadow-[0_8px_25px_rgba(0,0,0,0.06)]
                             hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                             transition-all duration-300
                             hover:-translate-y-1"
                >

                  {/* DELETE BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this board?"
                      );
                      if (!confirmDelete) return;

                      deleteBoardMutation.mutate(board._id);
                    }}
                    className="absolute top-4 right-4
                               text-xs text-red-500
                               opacity-0 group-hover:opacity-100
                               hover:text-red-700
                               transition"
                  >
                    {deleteBoardMutation.isPending ? "..." : "Delete"}
                  </button>

                  {/* BOARD LINK */}
                  <Link to={`/board/${board._id}`} className="block">
                    <h3
                      className="text-lg font-semibold text-gray-800
                                 group-hover:text-indigo-600
                                 transition-colors"
                    >
                      {board.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Click to open board →
                    </p>
                  </Link>

                  {/* HOVER OVERLAY */}
                  <div
                    className="absolute inset-0 rounded-2xl
                               bg-gradient-to-tr
                               from-indigo-500/5 to-transparent
                               opacity-0 group-hover:opacity-100
                               transition duration-300
                               pointer-events-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}